import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cookieService: CookieService) {}

  setUsername(name: string) {
    this.cookieService.set('useremail', name);
  }
  getUserEmail(): string {
    return this.cookieService.get('useremail') || '';
  }
}
