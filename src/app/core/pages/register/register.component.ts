import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthApiService } from 'auth-api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';
import { Router, RouterModule } from '@angular/router';
import { RegisterDTO } from '../../../../../dist/auth-api/lib/interfaces/register.dto';
import { RegisterAdapterRes } from '../../../../../dist/auth-api/lib/interfaces/registerRes.dto';
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
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {

  constructor(private _authApiService: AuthApiService,private _router:Router) {}
  backendError:string|undefined|null='';

  registerForm = new FormGroup({
    username:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]),
    firstName:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]),
    lastName:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  });
  ngOnInit(): void {}
  onSubmit() {
    this._authApiService.register(this.registerForm.value as RegisterDTO).subscribe({
      next: (res:RegisterAdapterRes) => {
        
        console.log(res);
      if(res.message=='success'){
        this._router.navigate(['/auth/login'])
      }
     else{
      this.backendError=res.error?.message;
     }
      },      

        
    });
    console.warn(this.registerForm.value);
  }
}
