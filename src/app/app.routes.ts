import { LazyLoadMeta } from './../../node_modules/primeng/api/lazyloadmeta.d';
import { LoginComponent } from './core/pages/login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('./core/pages/login/login.component').then(e=>e.LoginComponent)
    }
];
