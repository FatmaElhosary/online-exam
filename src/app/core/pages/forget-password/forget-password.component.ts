import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AuthApiService } from 'auth-api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';
 import { Subscription } from 'rxjs';
import { ForgetPasswordDTO } from '../../../../../projects/auth-api/src/lib/interfaces/forgetPassword.dto';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    ErrorComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  constructor(
    private _authApiService: AuthApiService,
    private _router: Router
  ) {}
 

  backendError: string | undefined | null = '';
  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  ngOnInit(): void {}
  onSubmit() {
    const sub = this._authApiService
      .forgetPassword(this.forgetPasswordForm.value as ForgetPasswordDTO)
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
    this.subscription.add(sub);
  }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
