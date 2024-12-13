import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _tokenService: TokenService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._tokenService.getToken();
    console.log('header',token);
    
    if (token) {
      if (req.url.includes('/login') || req.url.includes('/register')) {
        return next.handle(req); // Skip adding the token
      }
      const cloned = req.clone({
        setHeaders: {
          token: token,
        },
      //  headers: req.headers.set('token', token)
      });

      return next.handle(cloned);
    }
    return next.handle(req);
  }
}