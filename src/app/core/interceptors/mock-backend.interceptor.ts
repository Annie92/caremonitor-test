
import {
  HttpInterceptorFn,
  HttpResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const { url, method, body } = req;

  return of(null).pipe(
    mergeMap(() => {
      // Mock GET /api/items
      if (url.endsWith('/api/items') && method === 'GET') {
        console.log('hi, this is Mock GET /api/items')
        const token = cookieService.get('auth_token');
        if (token === 'mock-token') {
          const items = [
            { id: 1, name: 'Item One', description: 'Description for Item One' },
            { id: 2, name: 'Item Two', description: 'Description for Item Two' },
            { id: 3, name: 'Item Three', description: 'Description for Item Three' }
          ];
          return of(new HttpResponse({ status: 200, body: items }));
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
    delay(5000) // simulate latency
  );
};
