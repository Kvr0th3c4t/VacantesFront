import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogin } from '../interfaces/ilogin';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../interfaces/ilogin-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpCliente = inject(HttpClient);

  private baseUrl: string = 'http://localhost:9005';

  constructor() {}

  login(user: ILogin): Observable<ILoginResponse> {
    return this.httpCliente.post<ILoginResponse>(
      this.baseUrl + '/auth/login',
      user
    );
  }
  registro(data: any): Observable<any> {
    return this.httpCliente.post('http://localhost:9005/auth/registro', data);
  }
}
