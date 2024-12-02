import { LazyLoadMeta } from './../../node_modules/primeng/api/lazyloadmeta.d';
import { LoginComponent } from './core/pages/login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/pages/login/login.component').then(
            (e) => e.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/pages/register/register.component').then(
            (e) => e.RegisterComponent
          ),
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./feature/pages/home/home.component').then(
        (e) => e.HomeComponent
      ),
  },
];
