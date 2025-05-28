import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CookieService } from 'ngx-cookie-service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mockBackendInterceptor } from './core/interceptors/mock-backend.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([mockBackendInterceptor])),
    CookieService
  ]
};
