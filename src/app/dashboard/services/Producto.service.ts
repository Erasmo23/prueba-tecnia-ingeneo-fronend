import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ProductoRequest } from '../../shared/interfaces/producto-request.interfaces';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Errors, ListResponse, Producto } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private readonly baseUrl : string = environments.baseUrlApi;
  private http = inject(HttpClient);

  constructor() { }


  getListProductos () : Observable<ListResponse<Producto>> {
    const url = `${this.baseUrl}/productos?page=0&size=10`
    return this.http.get<ListResponse<Producto>>(url);
  }


  registro (producto : ProductoRequest) : Observable<boolean> {

    const url = `${this.baseUrl}/productos`;
    const body = producto;

    return this.http.post<Producto>(url, body)
      .pipe(
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


  delete(productoId : number) : Observable<boolean> {
    const url = `${this.baseUrl}/productos/${productoId}`;
    return this.http.delete(url)
        .pipe(
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

}
