import { Component, inject } from "@angular/core";
import { ICardVacante } from "../../interfaces/icard-vacante";
import { ClienteService } from "../../services/cliente.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-cliente-solicitar-vacante",
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: "./cliente-solicitar-vacante.component.html",
	styleUrl: "./cliente-solicitar-vacante.component.css",
})
export class ClienteSolicitarVacanteComponent {
	usuarioService = inject(ClienteService);
	activatedRoute = inject(ActivatedRoute);
	router = inject(Router);
	vacante: ICardVacante;
	formSolicitud!: FormGroup;

	loading: boolean;

	constructor() {
		this.vacante = {} as ICardVacante;
		this.loading = false;
	}
	ngOnInit() {
		this.vacante = {} as ICardVacante;
		this.initForm();
		this.loadVacante();
	}

	initForm() {
		this.formSolicitud = new FormGroup({
			comentarios: new FormControl("", Validators.required),
		});
	}

	loadVacante() {
		this.activatedRoute.params.subscribe((params: any) => {
			const id: string = params.idVacante;
			this.usuarioService.getById(id).subscribe((data: ICardVacante) => {
				this.vacante = data;
			});
		});
	}

	enviarSolicitud() {
		if (this.formSolicitud.invalid) {
			this.formSolicitud.markAllAsTouched();
			return;
		}

		this.loading = true;
		const idVacante = this.vacante.idVacante;
		const solicitud = {
			archivo: "archivo.pdf",
			comentarios: this.formSolicitud.value.comentarios,
			curriculum: "cv.pdf",
		};

		this.usuarioService.postularVacante(idVacante, solicitud).subscribe({
			next: (res: any) => {
				this.loading = false;
				this.mostrarExito(res.mensaje, () => {
					this.router.navigate(["/usuario/solicitudes"]);
				});
			},
			error: (err) => {
				this.loading = false;
				let mensaje = "Error al postular. Intenta nuevamente.";
				if (err.status === 409) {
					mensaje = err.error?.mensaje || "Ya has solicitado esta vacante.";
				}
				this.mostrarError(mensaje);
			},
		});
	}

	goBack() {
		this.router.navigate(["/usuario/home"]);
	}

	get comentarios() {
		return this.formSolicitud.get("comentarios");
	}

	private mostrarExito(mensaje: string, callback?: () => void): void {
		Swal.fire({
			icon: "success",
			title: "¡Solicitud enviada!",
			text: mensaje,
			confirmButtonText: "Aceptar",
			customClass: {
				confirmButton: "btn btn-secondary",
			},
			buttonsStyling: false,
		}).then((result) => {
			if (result.isConfirmed && callback) callback();
		});
	}

	private mostrarError(mensaje: string): void {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: mensaje,
			confirmButtonText: "Aceptar",
			customClass: {
				confirmButton: "btn btn-secondary",
			},
			buttonsStyling: false,
		});
	}
}
