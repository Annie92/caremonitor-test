import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [CookieService],
})
export class DashboardComponent {
  cookieValue: string = '';
  username: string = 'Annie Pappachan'; 
  cookieService = inject(CookieService);
  constructor(){
    this.cookieService.set('auth_token', 'mock-token');
    this.cookieValue = this.cookieService.get('auth_token');
    console.log('Cookie Value:', this.cookieValue);
  }

}
