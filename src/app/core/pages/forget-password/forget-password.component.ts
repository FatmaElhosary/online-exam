import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthApiService } from 'auth-api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ForgetPasswordDTO } from '../../../../../projects/auth-api/src/lib/interfaces/forgetPassword.dto';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { GlobalInputComponent } from '../../../shared/components/ui/global-input/globalInput.component';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ErrorComponent,
    PrimaryButtonComponent,
    GlobalInputComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private _authApiService: AuthApiService,
    private _router: Router
  ) {}
  get emailControl(): FormControl {
    return this.forgetPasswordForm.get('email') as FormControl;
  }

  backendError: string | undefined | null = '';
  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  ngOnInit(): void {}
  onSubmit() {
    this._authApiService
      .forgetPassword(this.forgetPasswordForm.value as ForgetPasswordDTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this._router.navigate([
              '/auth/verify-code',
              this.forgetPasswordForm.value,
            ]);
          } else {
            this.backendError = res.error?.message;
          }
        },
      });
    console.warn(this.forgetPasswordForm.value);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
