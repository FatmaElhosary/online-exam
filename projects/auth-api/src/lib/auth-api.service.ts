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
import { ForgetPasswordDTO } from './interfaces/forgetPassword.dto';
import { ForgetPasswordAdapter } from './adapter/forget-password.service';
import {
  ForgetPasswordAdapterRes,
  ForgetPasswordResponseDTO,
} from './interfaces/forgetPasswordRes.dto';
import { VerifyCodeDTO } from './interfaces/verifyCode.dto';
import { VerifyCodeAdapterRes } from './interfaces/verifuCodeRes.dto';
import { VerifyCodeAdapter } from './adapter/verify-code.service';
import { ResetPasswordDTO } from './interfaces/resetPassword.dto';
import { ResetPasswordAdapterRes } from './interfaces/resetPasswordRes.dto';
import { ResetPasswordAdapter } from './adapter/reset-password.service';
import { LogoutAdapterRes } from './interfaces/logoutRes.dto';
import { LogoutAdapter } from './adapter/logout.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements AuthApiInterface {
  constructor(
    private _httpClient: HttpClient,
    private _authLoginApiAdapter: AuthLoginApiAdapter,
    private _authRegisterAdapterer: AuthRegisterAdapterer,
    private _forgetPasswordAdapter: ForgetPasswordAdapter,
    private _verifyCodeAdapter:VerifyCodeAdapter,
    private _resetPasswordAdapter:ResetPasswordAdapter,
    private _logoutAdapter:LogoutAdapter,
  ) {}
  logout(): Observable<LogoutAdapterRes> {
    return this._httpClient.get(AuthEndPoints.LOG_OUT    ).pipe(
      map((res: any) => this._logoutAdapter.adapt(res)),
      catchError((err) => of(err))
    );
  }

  login(data: LoginDTO): Observable<LoginAdapterRes> {
    return this._httpClient.post(AuthEndPoints.LOGIN, data).pipe(
      map((res: any) => this._authLoginApiAdapter.adapt(res)),
      catchError((err) => of(err))
    );
  }
  register(data: RegisterDTO): Observable<RegisterAdapterRes> {
    return this._httpClient.post(AuthEndPoints.REGISTER, data).pipe(
      map((res: any) => this._authRegisterAdapterer.adapt(res)),
      catchError((err) => of(err))
    );
  }
  forgetPassword(
    data: ForgetPasswordDTO
  ): Observable<ForgetPasswordAdapterRes> {
    return this._httpClient.post(AuthEndPoints.FORGET_PASSWORD, data).pipe(
      map((res: any) => this._forgetPasswordAdapter.adapt(res)),
      catchError((err) => of(err))
    );
  }
  verifyCode(data: VerifyCodeDTO): Observable<VerifyCodeAdapterRes> {
    return this._httpClient.post(AuthEndPoints.VERIFY_CODE,data).pipe(
      map((res:any)=>this._verifyCodeAdapter.adapt( res)),
      catchError(err=>of(err))
    )
  }
  resetPassword(data: ResetPasswordDTO): Observable<ResetPasswordAdapterRes> {
    return this._httpClient.put(AuthEndPoints.RESET_PASSWORD,data).pipe(
      map((res:any)=>this._resetPasswordAdapter.adapt( res)),
      catchError(err=>of(err))
    )
  }
}
