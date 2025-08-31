import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthApiService } from 'auth-api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';
 
import { Subscription } from 'rxjs';
import { VerifyCodeDTO } from '../../../../../projects/auth-api/src/lib/interfaces/verifyCode.dto';
@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [ButtonModule,InputTextModule,CommonModule,ReactiveFormsModule,ErrorComponent,
    
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent implements OnDestroy {
    private subscription = new Subscription();
  
  constructor(
    private _authApiService: AuthApiService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}
  backendError: string | undefined|null = '';
  email:string='';
  verifyCodeForm = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => this.email = params['email']);

  }
  onSubmit() {
  const sub=this._authApiService
      .verifyCode(this.verifyCodeForm.value as VerifyCodeDTO)
      .subscribe({
        next: (res:any) => {
          console.log(res);
          if (res.message == 'Success') {
            this._router.navigate(['/auth/reset-password']);
          } else {
            this.backendError = res.error?.message;
          }
        },
      });
    console.warn(this.verifyCodeForm.value);
    this.subscription.add(sub);
  }

  resendCode(){
    // this._authApiService.resetPassword({email:this.email} as ResetPasswordDTO).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     if (res.message == 'success') {
    //       console.log('code send');
    //     } else {
    //       this.backendError = res.error?.message;
    //     }
    //   },
    // });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
