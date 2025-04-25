import { Component, inject } from "@angular/core";
import { CardVacanteComponent } from "../../components/card-vacante/card-vacante.component";
import { ICardVacante } from "../../interfaces/icard-vacante";
import { ClienteService } from "../../services/cliente.service";
import { IUser } from "../../interfaces/iuser";
import { EmpresaService } from "../../services/empresa.service";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [CardVacanteComponent],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
})
export class HomeComponent {
	private clienteService = inject(ClienteService);
	private empresaService = inject(EmpresaService);

	arrVacantes: ICardVacante[];
	userRole: string;
	user: IUser;
	cargando: boolean = true; // Variable para controlar el estado de carga

	constructor() {
		this.arrVacantes = [];
		this.user = JSON.parse(localStorage.getItem("user")!); // Asumiendo que el rol del usuario está almacenado en localStorage
		this.userRole = this.user.rol || "";
	}
	ngOnInit() {
		if (this.userRole === "CLIENTE") {
			this.loadVacantes(); // Cargar vacantes solo si el rol es CLIENTE
		}

		if (this.userRole === "EMPRESA") {
			this.loadVacantesE(); // Cargar vacantes solo si el rol es EMPRESA
		}
	}
	loadVacantes() {
		this.clienteService.getAll().subscribe((data: ICardVacante[]) => {
			this.arrVacantes = data;
			this.cargando = false; // Cambia el estado de carga a falso una vez que los datos se han cargado
		});
	}
	
	loadVacantesE() {
		this.empresaService.getAll().subscribe((data: ICardVacante[]) => {
			this.arrVacantes = data;
			this.cargando = false; // Cambia el estado de carga a falso una vez que los datos se han cargado
		});
	}
}
