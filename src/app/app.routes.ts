import { Routes } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';

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
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./core/pages/forget-password/forget-password.component').then(
            (e) => e.ForgetPasswordComponent
          ),
      },
      {
        path: 'verify-code',
        loadComponent: () =>
          import('./core/pages/verify-code/verify-code.component').then(
            (e) => e.VerifyCodeComponent
          ),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./core/pages/reset-password/reset-password.component').then(
            (e) => e.ResetPasswordComponent
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
    children: [
      {
        path: '',
        redirectTo: '/home/quizes',
        pathMatch: 'full',
      },
      {
        path: 'quizes',
        loadComponent: () =>
          import('./feature/pages/subjects/subjects.component').then(
            (e) => e.SubjectsComponent
          ),
      },
      {
        path: 'exams/:examId',
        loadComponent: () =>
          import('./feature/pages/quizContainer/quizContainer.component').then(
            (e) => e.QuizContainerComponent
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
