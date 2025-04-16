import { Component, inject, signal } from "@angular/core";
import { ClienteService } from "../../services/cliente.service";
import { ISolicitudes } from "../../interfaces/isolicitudes";
import { CardSolicitudesComponent } from "../../components/card-solicitudes/card-solicitudes.component";

@Component({
	selector: "app-cliente-solicitudes",
	standalone: true,
	imports: [CardSolicitudesComponent],
	templateUrl: "./cliente-solicitudes.component.html",
	styleUrl: "./cliente-solicitudes.component.css",
})
export class ClienteSolicitudesComponent {
	private clienteService = inject(ClienteService);

	solicitudes = signal<ISolicitudes[]>([]);
	cargando = signal(true);

	ngOnInit() {
		this.loadSolicitudes();
	}

	loadSolicitudes() {
		this.cargando = signal(true);
		this.clienteService.getSolicitudes().subscribe((data) => {
			this.solicitudes.set(data);
			this.cargando.set(false);
		});
	}
}
