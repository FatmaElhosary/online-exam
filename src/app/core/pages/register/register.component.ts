import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthApiService } from 'auth-api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';
import { Router, RouterModule } from '@angular/router';

import { Subscription } from 'rxjs';
import { RegisterDTO } from '../../../../../projects/auth-api/src/lib/interfaces/register.dto';
import { RegisterAdapterRes } from '../../../../../projects/auth-api/src/lib/interfaces/registerRes.dto';
import { PrimaryButtonComponent } from '../../../shared/components/ui/primary-button/primary-button.component';
import { GlobalInputComponent } from '../../../shared/components/ui/global-input/globalInput.component';
import { matchPasswords } from '../../../shared/services/utills';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    ErrorComponent,
    RouterModule,
    PrimaryButtonComponent,
    GlobalInputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  constructor(
    private _authApiService: AuthApiService,
    private _router: Router
  ) {}
  get emailControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get rePasswordControl(): FormControl {
    return this.registerForm.get('rePassword') as FormControl;
  }
  get phoneControl(): FormControl {
    return this.registerForm.get('phone') as FormControl;
  }
  get userNameControl(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }
  get firstNameControl(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get lastNameControl(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  backendError: string | undefined | null = '';

  registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    {
      validators: matchPasswords('password', 'rePassword'),
    }
  );
  ngOnInit(): void {}
  onSubmit() {
    const sub = this._authApiService
      .register(this.registerForm.value as RegisterDTO)
      .subscribe({
        next: (res: RegisterAdapterRes) => {
          console.log(res);
          if (res.message == 'success') {
            this._router.navigate(['/auth/login']);
          } else {
            this.backendError = res.error?.message;
          }
        },
      });
    console.warn(this.registerForm.value);

    this.subscription.add(sub);
  }

  // isInvalid(controlName: string) {
  //   const control = this.registerForm.get(controlName);
  //   return control?.invalid && control.touched;
  // }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
