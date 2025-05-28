import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedModule } from "../../shared/shared.module";
import { AuthService } from '../../auth/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule,CommonModule, SharedModule, MatProgressSpinnerModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  loading: Observable<boolean>;
  constructor(private router: Router,
    private cdr: ChangeDetectorRef,
    public loaderService: LoaderService, 
    private authService: AuthService
  ) 
  {
      this.loading = this.loaderService.loading$;
      console.log('MainLayoutComponent initialized loading:',this.loading);      
  }
  ngOnInit() {
    this.loaderService.loading$.subscribe((isLoading:any) => {
      setTimeout(() => {
        this.cdr.detectChanges(); 
        this.loading = isLoading;
      });
    });
  }
  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
