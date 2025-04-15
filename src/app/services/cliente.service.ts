import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICardVacante } from '../interfaces/icard-vacante';
import { ISolicitudes } from '../interfaces/isolicitudes';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  httpCliente = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9005';
  constructor() {}

  getAll(): Observable<ICardVacante[]> {
    return this.httpCliente.get<ICardVacante[]>(
      this.baseUrl + '/api/usuario/verVacanteCreada'
    );
  }
  getById(idVavante: string): Observable<ICardVacante> {
    return this.httpCliente.get<ICardVacante>(
      this.baseUrl + '/api/usuario/vacantes/' + idVavante
    );
  }

  getSolicitudes(): Observable<ISolicitudes[]> {
    return this.httpCliente.get<ISolicitudes[]>(
      this.baseUrl + '/api/usuario/verSolicitudes'
    );
  }
}
