import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  isLoggedIn(): boolean {
    return this.cookieService.check('auth_token');
  }

  logout() {
    console.log('Logging out...');
    this.cookieService.delete('auth_token');
  }
}
