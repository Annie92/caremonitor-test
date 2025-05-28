import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, SharedModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {constructor(private router: Router) {}

  handleLogout() {
    this.router.navigate(['/login']);
  }

}
