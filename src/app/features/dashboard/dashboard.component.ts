import { Component, inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  cookieValue: string = '';
  username: string = ''; 
  constructor(private userService: UserService) {
    
  }
  ngOnInit() {
    this.username = this.userService.getUserEmail();
  }

}
