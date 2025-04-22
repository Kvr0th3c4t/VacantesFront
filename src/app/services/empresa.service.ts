import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICardVacante } from '../interfaces/icard-vacante';
import { ISolicitudes } from '../interfaces/isolicitudes';
import { Iempresa } from '../interfaces/iempresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  httpCliente = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9005/api/empresa';

  constructor() { }

  // Ver todas las vacantes
  getAll(): Observable<ICardVacante[]> {
    return this.httpCliente.get<ICardVacante[]>(`${this.baseUrl}/verTodasVacantes`);
  }

  // Modificar empresa
  modificarEmpresa(data: Iempresa): Observable<any> {
    return this.httpCliente.put(`${this.baseUrl}/modificarEmpresa`, data);
  }

  // Alta vacante
  altaVacante(data: ICardVacante): Observable<any> {
    return this.httpCliente.post(`${this.baseUrl}/altaVacante`, data);
  }

  // Eliminar vacante
  eliminarVacante(id: number): Observable<any> {
    return this.httpCliente.put(`${this.baseUrl}/eliminarVacante/${id}`, {});
  }

  // Modificar vacante
  modificarVacante(id: number, data: ICardVacante): Observable<any> {
    return this.httpCliente.put(`${this.baseUrl}/modificarVacante/${id}`, data);
  }

  // Ver detalle de vacante
  verDetalleVacante(id: number): Observable<any> {
    return this.httpCliente.get(`${this.baseUrl}/detalleVacante/${id}`);
  }

  // Asignar candidato
  asignarCandidato(idVacante: number, email: string): Observable<any> {
    return this.httpCliente.put(`${this.baseUrl}/asignarVacante/${idVacante}/${email}`, {});
  }

  // Ver todas las solicitudes
  getSolicitudes(): Observable<ISolicitudes[]> {
    return this.httpCliente.get<ISolicitudes[]>(
      this.baseUrl + '/verTodasSolicitudes'
    );
  }
  // Ver CV
  verCV(idSolicitud: number): Observable<Blob> {
    return this.httpCliente.get(`${this.baseUrl}/verCV/${idSolicitud}`, { responseType: 'blob' });
  }

  // Aceptar solicitud
  aceptarSolicitud(idSolicitud: number): Observable<any> {
    return this.httpCliente.put(`${this.baseUrl}/aceptarSolicitud/${idSolicitud}`, {});
  }

  // Denegar solicitud
  denegarSolicitud(idSolicitud: number): Observable<any> {
    return this.httpCliente.put(`${this.baseUrl}/denegarSolicitud/${idSolicitud}`, {});
  }

  // Escribir comentario
  escribirComentario(idSolicitud: number, comentario: string): Observable<any> {
    return this.httpCliente.put(`${this.baseUrl}/escribirComentario/${idSolicitud}`, comentario);
  }
}
