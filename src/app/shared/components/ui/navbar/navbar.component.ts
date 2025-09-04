import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TokenService } from '../../../../core/services/token.service';
import { AuthApiService } from 'auth-api';
import { Router, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SidebarComponent,
    RouterModule,
    PrimaryButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  //showSearch: boolean = false;
  showSidebar: boolean = true;
  backendError: string | null | undefined;
  constructor(
    private _tokenService: TokenService,
    private _authApiService: AuthApiService,
    private _router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}
  ngOnInit(): void {
    ///////////////////show sidebar in large screens//////////////////////////
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result.matches) {
          // big screens
          this.showSidebar = true;
        } else {
          // small screens
          this.showSidebar = false;
        }
      });
  }

  // toggleSearch() {
  //   this.showSearch = !this.showSearch;
  // }
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  logout() {
    //api
    this._authApiService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this._tokenService.removeToken();
            this._router.navigateByUrl('/auth/login');
          } else {
            this.backendError = res.error?.message;
          }
        },
      });
    //login screen
  }
  ngOnDestroy(): void {
    this.destroy$.complete(); // Completes the subject
  }
}
