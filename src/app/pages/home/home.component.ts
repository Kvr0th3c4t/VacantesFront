import { Component, inject } from "@angular/core";
import { CardVacanteComponent } from "../../components/card-vacante/card-vacante.component";
import { ICardVacante } from "../../interfaces/icard-vacante";
import { ClienteService } from "../../services/cliente.service";
import { IUser } from "../../interfaces/iuser";
import { EmpresaService } from "../../services/empresa.service";
import { AdminService } from '../../services/admin.service';
import { Iempresa } from "../../interfaces/iempresa";
import { ISolicitudes } from "../../interfaces/isolicitudes";
import { ICategoria } from "../../interfaces/icategoria";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [CardVacanteComponent, RouterLink],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
})
export class HomeComponent {
	private clienteService = inject(ClienteService);
	private empresaService = inject(EmpresaService);
	private adminService = inject(AdminService);

	arrVacantes: ICardVacante[];
	arrEmpresas: Iempresa[];
	arrUsuarios: IUser[];
	arrSolicitudes: ISolicitudes[];
	arrCategorias: ICategoria[];
	userRole: string;
	user: IUser;
	cargando: boolean = true; // Variable para controlar el estado de carga

	constructor() {
		this.arrVacantes = [];
		this.arrEmpresas = [];
		this.arrUsuarios = [];
		this.arrSolicitudes = [];
		this.arrCategorias = [];
		this.user = JSON.parse(localStorage.getItem("user")!); // Asumiendo que el rol del usuario está almacenado en localStorage
		this.userRole = this.user.rol || "";
	}
	ngOnInit() {
		if (this.userRole === "CLIENTE") {
			this.loadVacantes(); // Cargar vacantes solo si el rol es CLIENTE
		}

		if (this.userRole === "EMPRESA") {
			this.loadVacantesE(); // Cargar vacantes solo si el rol es EMPRESA
		} else {
			this.loadEmpresas();
			this.loadVacantesAdmin();
			this.loadUsuarios();
			this.loadSolicitudes();
			this.loadCategorias();
			this.getVacantesCategorias();
		}
		
	}

	//Vacantes
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

	loadVacantesAdmin() {
		this.adminService.getAllVacantes().subscribe((data: ICardVacante[]) => {
			this.arrVacantes = data;
			this.cargando = false;
		})
	}

	//Empresa

	
	loadEmpresas() {
		this.adminService.getAllEmpresas().subscribe((data: Iempresa[]) => {
			this.arrEmpresas = data;
			this.cargando = false;			
		})
	}

	//Usuarios

	loadUsuarios() {
		this.adminService.getAllUsers().subscribe((data: IUser[]) => {
			this.arrUsuarios = data;
			this.cargando = false;
		})
	}

	//Solicitudes
	loadSolicitudes() {
		this.adminService.getAllSolicitudes().subscribe((data: ISolicitudes[]) => {
			this.arrSolicitudes = data;
			this.cargando = false;
		})

	}
	//Categorias
	loadCategorias() {
		this.adminService.getAllCategorias().subscribe((data: ICategoria[]) => {
			this.arrCategorias = data;
			this.cargando = false;
		})
	}

	getVacantesCategorias(): string {
		if (this.arrCategorias.length !== 0 && this.arrVacantes.length !== 0) {
			return (this.arrVacantes.length / this.arrCategorias.length).toFixed(2);
		}
		return '0'; 
	}
}
