import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
   { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
   provideRouter(routes), provideClientHydration(),
     provideHttpClient(withFetch(), withInterceptorsFromDi()), TokenInterceptor,CookieService,provideAnimations(), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
   //  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
   ]
};
