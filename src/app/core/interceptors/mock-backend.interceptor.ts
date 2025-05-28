
import {
  HttpInterceptorFn,
  HttpResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, finalize, mergeMap, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { LoaderService } from '../../shared/services/loader.service';

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const cookieService = inject(CookieService);

  return of(null).pipe(
    mergeMap(() => {

      const { url, method, body } = req;

      // POST /api/login
      if (url.endsWith('/api/login') && method === 'POST') {
        loaderService.show();
        const { email, password } = body as { email: string; password: string };
        // console.log('Login submitted', { email, password });
        if (email === 'admin@cm.au' && password === '123') {
          cookieService.set('auth_token', 'mock-token');
          
          return of(new HttpResponse({ status: 200, body: { token: 'mock-token' } })).pipe(delay(3000));
        } else {
          return throwError(() => ({
            status: 401,
            error: { message: 'Invalid credentials' }
          }));
        }
      }


      // Mock GET /api/items
      if (url.endsWith('/api/items') && method === 'GET') {
        const token = cookieService.get('auth_token');
        
        if (token === 'mock-token') {
          loaderService.show();
          const items = [
            { id: 1, name: 'Item One', description: 'Description for Item One' },
            { id: 2, name: 'Item Two', description: 'Description for Item Two' },
            { id: 3, name: 'Item Three', description: 'Description for Item Three' }
          ];
          return of(new HttpResponse({ status: 200, body: items })).pipe(delay(3000));
        } else {
          return throwError(() => ({
            status: 403,
            error: { message: 'Unauthorized' }
          }));
        }
      }
      // Pass through other requests
      return next(req);
    }),
    finalize(() => {
        // Hide loader when response is ready
        loaderService.hide();
    })
  );
};
