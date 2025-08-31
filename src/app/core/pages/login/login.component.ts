import { InputTextModule } from 'primeng/inputtext';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthApiService } from 'auth-api';

import { LoginDTO } from '../../../../../dist/auth-api/lib/interfaces/login.dto';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    CommonModule,
    ErrorComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private destroy$ = new Subject<void>();

  constructor(
    private _authApiService: AuthApiService,
    private _tokenService: TokenService,
    private _router: Router
  ) {}
  backendError: string | undefined | null = '';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]),
  });
  ngOnInit(): void {}
  onSubmit() {
    this._authApiService
      .login(this.loginForm.value as LoginDTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this._tokenService.setToken(res.token);
            this._router.navigate(['/home/quizes']);
          } else {
            this.backendError = res.error?.message;
          }
        },
      });
    console.warn(this.loginForm.value);
  }

  ngOnDestroy() {
    this.destroy$.complete(); // Completes the subject
  }
}
