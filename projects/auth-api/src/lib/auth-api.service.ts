import { Injectable } from '@angular/core';
import { AuthApiInterface } from './base/authApi';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoints } from './enums/AuthApi.endpoint';
import { AuthApiAdapterService } from './adapter/auth-api-adapter.service';
import { LoginDTO } from './interfaces/login.dto';
import { LoginAdapterRes, LoginResponseDTO } from './interfaces/loginRes.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthApiInterface {

  constructor(private _httpClient:HttpClient, private _authApiAdapterService:AuthApiAdapterService) { }
  login(data: LoginDTO) :Observable<LoginAdapterRes|never[]>{
 return this._httpClient.post(AuthEndPoints.LOGIN,data).pipe(
  map((res:any)=>this._authApiAdapterService.adapt(res)),
  catchError(err=> of([]))
 )
  }
  register(data: any): Observable<any>{
    return this._httpClient.post(AuthEndPoints.LOGIN,data)

  }
}
