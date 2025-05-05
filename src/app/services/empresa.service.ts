import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICardVacante } from "../interfaces/icard-vacante";
import { ISolicitudes } from "../interfaces/isolicitudes";
import { Iempresa } from "../interfaces/iempresa";
import { IVacanteDetalle } from "../interfaces/ivacante-detalle";
import { IVacanteModificar } from "../interfaces/ivacante-modificar";
import { IVacanteAlta } from "../interfaces/ivacante-alta";
import { ICategoria } from "../interfaces/icategoria";
import { IEmpresaModificar } from "../interfaces/iempresa-modificar";

@Injectable({
	providedIn: "root",
})
export class EmpresaService {
	httpCliente = inject(HttpClient);

	private baseUrl: string = "http://localhost:9005/api/empresa";

	constructor() {}

	// Ver todas las vacantes
	getAll(): Observable<ICardVacante[]> {
		return this.httpCliente.get<ICardVacante[]>(`${this.baseUrl}/verTodasVacantes`);
	}

	// Modificar empresa
	modificarEmpresa(data: IEmpresaModificar): Observable<IEmpresaModificar> {
		return this.httpCliente.put<IEmpresaModificar>(`${this.baseUrl}/modificarEmpresa`, data);
	}
	//muestra datos del perfil del token
	getPerfilEmpresa(): Observable<IEmpresaModificar> {
		return this.httpCliente.get<IEmpresaModificar>(`${this.baseUrl}/perfilEmpresa`);
	}

	// Alta vacante
	insertVacante(data: IVacanteAlta): Observable<any> {
		return this.httpCliente.post(`${this.baseUrl}/altaVacante`, data);
	}

	// Eliminar vacante
	eliminarVacante(idVacante: string): Observable<any> {
		return this.httpCliente.put(`${this.baseUrl}/eliminarVacante/${idVacante}`, {});
	}

	// Modificar vacante
	modificarVacante(idVacante: string, data: IVacanteModificar): Observable<IVacanteModificar> {
		return this.httpCliente.put<IVacanteModificar>(`${this.baseUrl}/modificarVacante/${idVacante}`, data);
	}

	// Ver detalle de vacante
	verDetalleVacante(idVacante: string): Observable<IVacanteDetalle> {
		return this.httpCliente.get<IVacanteDetalle>(`${this.baseUrl}/detalleVacante/${idVacante}`);
	}

	// Asignar candidato
	asignarCandidato(idVacante: number): Observable<any> {
		return this.httpCliente.put(`${this.baseUrl}/asignarVacante/${idVacante}`, {});
	}

	getSolicitudes(): Observable<ISolicitudes[]> {
		return this.httpCliente.get<ISolicitudes[]>(this.baseUrl + "/verTodasSolicitudes");
	}

	// Ver CV
	verCV(idSolicitud: number): Observable<Blob> {
		return this.httpCliente.get(`${this.baseUrl}/verCV/${idSolicitud}`, { responseType: "blob" });
	}

	// Aceptar solicitud
	aceptarSolicitud(idSolicitud: string): Observable<any> {
		return this.httpCliente.put(`${this.baseUrl}/aceptarSolicitud/${idSolicitud}`, {});
	}

	// Denegar solicitud
	denegarSolicitud(idSolicitud: string): Observable<any> {
		return this.httpCliente.put(`${this.baseUrl}/denegarSolicitud/${idSolicitud}`, {});
	}

	// Escribir comentario
	escribirComentario(idSolicitud: number, comentario: string): Observable<any> {
		return this.httpCliente.put(`${this.baseUrl}/escribirComentario/${idSolicitud}`, comentario);
	}

	//trae las solicitudes enviadas a una vacante
	getSolicitudesPorVacante(idVacante: number): Observable<any[]> {
		return this.httpCliente.get<any[]>(`${this.baseUrl}/solicitudesPorVacante/${idVacante}`);
	}

	//buscar vacante por su id
	getVacanteById(idVacante: string): Observable<ICardVacante> {
		return this.httpCliente.get<ICardVacante>(`${this.baseUrl}/getVacante/${idVacante}`);
	}

	getAllCategorias(): Observable<ICategoria[]> {
		return this.httpCliente.get<ICategoria[]>(`${this.baseUrl}/verCategorias`);
	}
}
