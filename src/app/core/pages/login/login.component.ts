import { InputTextModule } from 'primeng/inputtext';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthApiService } from 'auth-api';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { Subject, takeUntil } from 'rxjs';
import { LoginDTO } from '../../../../../projects/auth-api/src/lib/interfaces/login.dto';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { GlobalInputComponent } from '../../../shared/components/ui/global-input/globalInput.component';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    ErrorComponent,
    RouterModule,
    PrimaryButtonComponent,
    GlobalInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private destroy$ = new Subject<void>();
  loading: boolean = false;

  constructor(
    private _authApiService: AuthApiService,
    private _tokenService: TokenService,
    private _router: Router,
    private _fb: FormBuilder
  ) {}
  backendError: string | undefined | null = '';
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      password: this._fb.control('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
    });
  }
  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  onSubmit() {
    this.loading = true;
    this._authApiService
      .login(this.loginForm.value as LoginDTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.loading = false;
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
