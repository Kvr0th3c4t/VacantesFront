import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { Iempresa } from '../interfaces/iempresa';
import { ICardVacante } from '../interfaces/icard-vacante';
import { ISolicitudes } from '../interfaces/isolicitudes';
import { ICategoria } from '../interfaces/icategoria';
import { IempresaTable } from '../interfaces/iempresa-table';
import { IEmpresaModificar } from '../interfaces/iempresa-modificar';
import { IAltaEmpresa } from '../interfaces/ialta-empresa';
import { IAltaAdmin } from '../interfaces/ialta-admin';
import { IUsuarioDetalle } from '../interfaces/iusuario-detalle';

@Injectable({
  providedIn: 'root'
})
  
export class AdminService {
httpCliente = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9005/api/admin';
  constructor() { }
  
  //Empresa

  getAllEmpresas(): Observable<Iempresa[]> {
      return this.httpCliente.get<Iempresa[]>(`${this.baseUrl}/verEmpresas`);
  }

  getEmpresaById(idEmpresa: string): Observable<IEmpresaModificar>{
    return this.httpCliente.get<IEmpresaModificar>(`${this.baseUrl}/getEmpresaId/${idEmpresa}`)
  } 
  
  modificarEmpresa(idEmpresa: string, data: IEmpresaModificar): Observable<IEmpresaModificar> {
    return this.httpCliente.put<IEmpresaModificar>(
      `${this.baseUrl}/modificarEmpresa/${idEmpresa}`,
      data
    );
  }

  altaEmpresa(data: IAltaEmpresa): Observable<any> {
      return this.httpCliente.post(`${this.baseUrl}/altaEmpresa`, data);
  }

  getAllEmpresasTable(): Observable<IempresaTable[]> {
      return this.httpCliente.get<IempresaTable[]>(`${this.baseUrl}/verEmpresas`);
  }
  
  eliminarEmpresa(idEmpresa: string): Observable<any>{
    return this.httpCliente.delete(`${this.baseUrl}/eliminarEmpresa/${idEmpresa}`)
  } 
  
  //Usuario
  getAllUsers(): Observable<IUser[]> {
    return this.httpCliente.get<IUser[]>(`${this.baseUrl}/verUsuarios`);
  }

  getUsuarioById(email: string): Observable<IUser>{
    return this.httpCliente.get<IUser>(`${this.baseUrl}/getUsuarioId/${email}`)
  } 

  modificarUsuario(email: string, data: IUser): Observable<IUser> {
    return this.httpCliente.put<IUser>(
      `${this.baseUrl}/modificarUsuario/${email}`,
      data
    );
  }

  // altaUsuario(data: IAltaAdmin): Observable<any> {
  //     return this.httpCliente.post(`${this.baseUrl}/altaAdmin`, data);
  // }

  eliminarUsuario(email: string): Observable<any>{
    return this.httpCliente.put(`${this.baseUrl}/eliminarUsuario/${email}`, {});
  }
  
  //Vacantes
  getAllVacantes(): Observable<ICardVacante[]> {
      return this.httpCliente.get<ICardVacante[]>(`${this.baseUrl}/verVacantes`);
  }

  //Solicitudes
  getAllSolicitudes(): Observable<ISolicitudes[]>{
    return this.httpCliente.get<ISolicitudes[]>(`${this.baseUrl}/verTodasSolicitudes`);
  }

  //Categorías
  getAllCategorias(): Observable<ICategoria[]>{
    return this.httpCliente.get<ICategoria[]>(`${this.baseUrl}/verCategorias`);
  }

  getCategoriaById(idCategoria: string): Observable<ICategoria>{
    return this.httpCliente.get<ICategoria>(`${this.baseUrl}/getCategoriaId/${idCategoria}`)
  } 

  modificarCategoria(idCategoria: string, data: ICategoria): Observable<ICategoria> {
    return this.httpCliente.put<ICategoria>(
      `${this.baseUrl}/modificarCategoria/${idCategoria}`,
      data
    );
  }

  eliminarCategoria(idCategoria: string): Observable<any>{
    return this.httpCliente.delete(`${this.baseUrl}/eliminarCategoria/${idCategoria}`)
  } 

  //PAULA
  altaCategoria(data: ICategoria): Observable<any> {
      return this.httpCliente.post(`${this.baseUrl}/altaCategoria`, data);
  }

  getAdministradores(): Observable<IUsuarioDetalle[]> {
    return this.httpCliente.get<IUsuarioDetalle[]>(`${this.baseUrl}/verAdministradores`);
  }

  altaAdmin(data: IUser): Observable<any> {
      return this.httpCliente.post(`${this.baseUrl}/altaAdmon`, data);
  }
}
