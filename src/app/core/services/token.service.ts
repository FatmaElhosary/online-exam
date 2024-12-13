import { Injectable } from '@angular/core';
import { TokenInterface } from '../interfaces/tokenInterface';
import { CookieService } from 'ngx-cookie-service';



 
@Injectable({
  providedIn: 'root',
})
export class TokenService implements TokenInterface {
  constructor(private _cookieService:CookieService) {}
  TOKEN_KEY: string = 'accessToken';
  setToken(token: string): void {
    this._cookieService.set(this.TOKEN_KEY, token, 365, '/', '', true, 'Strict');
    console.log(token);
    
    console.log('Token saved');
    
  }
  getToken(): string | null {
    return this._cookieService.get(this.TOKEN_KEY);
  }
  removeToken(): void {
    this._cookieService.delete(this.TOKEN_KEY);
  }
}
