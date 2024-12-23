import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from 'auth-api';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ResetPasswordDTO } from '../../../../../dist/auth-api/lib/interfaces/resetPassword.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ErrorComponent,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit,OnDestroy {
  private subscription = new Subscription();

  constructor(
    private _authApiService: AuthApiService,
    private _router: Router
  ) {}
  backendError: string | null | undefined = '';
  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]),
  });
  ngOnInit(): void {}
  onSubmit() {
    const sub = this._authApiService
      .resetPassword(this.resetPasswordForm.value as ResetPasswordDTO)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this._router.navigate(['/auth/login']);
          } else {
            this.backendError = res.error?.message;
          }
        },
      });
    console.warn(this.resetPasswordForm.value);
    this.subscription.add(sub);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
