import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { ICardVacante } from '../../interfaces/icard-vacante';
import { Router, RouterLink } from "@angular/router";
import { IUser } from "../../interfaces/iuser";
import { EmpresaService } from "../../services/empresa.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-card-vacante",
	standalone: true,
	imports: [RouterLink],
	templateUrl: "./card-vacante.component.html",
	styleUrl: "./card-vacante.component.css",
})
export class CardVacanteComponent {

	@Input() vacante!: ICardVacante;
	@Output() onEliminar = new EventEmitter<void>();
	
	userRole: string;
	router = inject(Router);
	user: IUser;
	cargando: boolean = true; // Variable para controlar el estado de carga
	eliminando: boolean;
	empresaService = inject(EmpresaService);
	
		constructor() {
			this.eliminando = false;
			this.user = JSON.parse(localStorage.getItem("user")!); // Asumiendo que el rol del usuario está almacenado en localStorage
			this.userRole = this.user.rol || "";
		}
		eliminarVacante(idVacante: string) {
			Swal.fire({
				title: "¿Estás seguro?",
				text: "Esta acción cancelará tu vacante.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Sí, eliminar",
				cancelButtonText: "Cancelar",
				customClass: {
					confirmButton: "btn btn-secondary",
					cancelButton: "btn btn-secondary ms-3",
				},
				buttonsStyling: false,
			}).then((result) => {
				if (result.isConfirmed) {
					this.empresaService.eliminarVacante(idVacante).subscribe(() => {
						Swal.fire({
							icon: "success",
							title: "Eliminada",
							text: "Tu solicitud ha sido eliminada.",
							confirmButtonText: "Aceptar",
							customClass: {
								confirmButton: "btn btn-secondary",
							},
							buttonsStyling: false,
						});
	
						this.eliminando = true;
	
						// Esperamos a que termine la animación antes de avisar al padre
						setTimeout(() => {
							this.onEliminar.emit();
							window.location.reload();
						}, 300); // duración igual a la del CSS
					});
				}
			});
		}

		verDetalle(idVacante: string) {
			this.empresaService.verDetalleVacante(idVacante);
			return this.router.navigate(["empresa/detalleVacante", idVacante]);
	}
}
