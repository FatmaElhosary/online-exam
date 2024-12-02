import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthApiService } from 'auth-api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDTO } from '../../../../../projects/auth-api/src/lib/interfaces/login.dto';
import { CommonModule } from '@angular/common';
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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {

  constructor(private _authApiService: AuthApiService) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {}
  onSubmit() {
    this._authApiService.login(this.loginForm.value as LoginDTO).subscribe({
      next: (res:any) => console.log(res),      
    });
    console.warn(this.loginForm.value);
  }
}
