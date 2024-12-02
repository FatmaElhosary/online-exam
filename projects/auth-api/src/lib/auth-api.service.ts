import { Injectable } from '@angular/core';
import { AuthApiInterface } from './base/authApi';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoints } from './enums/AuthApi.endpoint';
import { AuthLoginApiAdapter } from './adapter/auth-login-api-adapter.service';
import { LoginDTO } from './interfaces/login.dto';
import { LoginAdapterRes, LoginResponseDTO } from './interfaces/loginRes.dto';
import { ErrorResponseDTO } from './interfaces/error.interface';
import { RegisterDTO } from './interfaces/register.dto';
import { RegisterAdapterRes } from './interfaces/registerRes.dto';
import { AuthRegisterAdapterer } from './adapter/auth-register.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements AuthApiInterface {
  constructor(
    private _httpClient: HttpClient,
    private _authLoginApiAdapter: AuthLoginApiAdapter,
    private _authRegisterAdapterer:AuthRegisterAdapterer
  ) {}
  login(data: LoginDTO): Observable<LoginAdapterRes > {
    return this._httpClient.post(AuthEndPoints.LOGIN, data).pipe(
      map((res: any) => this._authLoginApiAdapter.adapt(res)),
      catchError((err) => of(err))
    );
  }
  register(data: RegisterDTO): Observable<RegisterAdapterRes|ErrorResponseDTO> {
    return this._httpClient.post(AuthEndPoints.REGISTER, data).pipe(
      map((res:any)=>this._authRegisterAdapterer.adapt(res)),
      catchError(err=>of(err))
    );
  }
}
