import { providePrimeNG } from 'primeng/config';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment.development';
import { BASEURL } from 'auth-api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: BASEURL, useValue: environment.baseUrl },
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    TokenInterceptor,
    CookieService,
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({}),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    //  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
};
