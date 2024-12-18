import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconFieldModule, IconField } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TokenService } from '../../../../core/services/token.service';
import { AuthApiService } from 'auth-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SidebarComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private _tokenService: TokenService,

    private _authApiService:AuthApiService,
    private _router:Router
  ) {}
  showSearch: boolean = false;
  showSidebar: boolean = false;
  backendError:string|null|undefined
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  logout() {
    //api
    this._authApiService.logout().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this._tokenService.removeToken();
          this._router.navigateByUrl('/auth/login')
        } else {
          this.backendError = res.error?.message;
        }
      },
    });;
    //login screen
    
  }
}
