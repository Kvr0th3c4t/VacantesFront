import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { Iempresa } from '../interfaces/iempresa';
import { ICardVacante } from '../interfaces/icard-vacante';
import { ISolicitudes } from '../interfaces/isolicitudes';
import { ICategoria } from '../interfaces/icategoria';
import { IempresaTable } from '../interfaces/iempresa-table';

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

  eliminarCategoria(idCategoria: string): Observable<any>{
    return this.httpCliente.delete(`${this.baseUrl}/eliminarCategoria/${idCategoria}`)
  } 

}
