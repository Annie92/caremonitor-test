import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, SharedModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  constructor(private router: Router, private authService: AuthService) {}

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
