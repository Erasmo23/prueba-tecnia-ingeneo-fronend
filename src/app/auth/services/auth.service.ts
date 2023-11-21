import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from '../../../environments/environments';
import { AuthStatus, Login, User, UserRequest } from '../interfaces';
import { Observable, catchError, map, of, tap, throwError, mergeMap } from 'rxjs';
import { Errors, Error } from '../../shared/interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl : string = environments.baseUrlApi;

  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);

  constructor() { }


  login (correo : string, password:string ) : Observable<boolean>{

    const url = `${this.baseUrl}/auth/login`;
    const body = {correo,password};

    return this.http.post<Login>(url, body)
      .pipe(
        tap( response => {
            console.log(this.jwtHelper.decodeToken(response.token));
            localStorage.setItem("user.correo",this.jwtHelper.decodeToken(response.token).sub);
            localStorage.setItem("user.roles",this.jwtHelper.decodeToken(response.token).authorities);
            localStorage.setItem("token", response.token);
          }
        ),
        map( () => true),
        catchError( error => {

          if (error.error && typeof error.error === 'object') {
            const errors: Errors = error.error;
            return throwError(() => errors);
          } else {
            // Si no es un JSON, construir una instancia de Errors con información predeterminada
            const errors: Errors = {
              errors: [{
                statusCode: error.status || 500,
                type: 'Error',
                source: 'Angular App',
                message: 'Algo salió mal',
                description: 'Hubo un error en la solicitud',
                localDateTime: new Date().toISOString()
              }]
            };

            return throwError(() => errors);
          }
        })
      );

  }

  registro (userRequest : UserRequest) : Observable<boolean> {
    const url = `${this.baseUrl}/auth/registro`;

    const body = userRequest;

    return this.http.post<User>(url, body)
      .pipe(
        mergeMap(userNew => {
          const bodyActive = { tokenActivate: userNew.tokenActivate };
          const urlActive = `${this.baseUrl}/auth/active`;
          return this.http.patch(urlActive, bodyActive);
        }
        ),
        map( () => true),
        catchError( error => {

          if (error.error && typeof error.error === 'object') {
            const errors: Errors = error.error;
            return throwError(() => errors);
          } else {
            // Si no es un JSON, construir una instancia de Errors con información predeterminada
            const errors: Errors = {
              errors: [{
                statusCode: error.status || 500,
                type: 'Error',
                source: 'Angular App',
                message: 'Algo salió mal',
                description: 'Hubo un error en la solicitud',
                localDateTime: new Date().toISOString()
              }]
            };

            return throwError(() => errors);
          }
        })
      );
  }

  usuarioValido() : boolean {
    const token = localStorage.getItem('token');

    if(this.jwtHelper.isTokenExpired(token!) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }

  getToken() : string{
    return localStorage.getItem('token')!;
  }

  getCorreoUser() : string{
    return localStorage.getItem('user.correo')!;
  }

  getRoles(){
    return localStorage.getItem('user.roles')!;
  }

  logout(): boolean{
    localStorage.removeItem('token');
    localStorage.removeItem('user.correo');
    localStorage.removeItem('user.roles');
    return true;
  }

}
