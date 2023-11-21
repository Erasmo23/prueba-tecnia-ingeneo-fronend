import { Injectable, inject } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth/services/auth.service';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  private authService = inject(AuthService);

  private readonly baseUrl : string = environments.baseUrlApi;

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if(req.url != `${this.baseUrl}/auth/login` &&
        req.url != `${this.baseUrl}/auth/registro` &&
        req.url != `${this.baseUrl}/auth/active`) {
    let tokenizeReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
  return next.handle(req);
  }
}
