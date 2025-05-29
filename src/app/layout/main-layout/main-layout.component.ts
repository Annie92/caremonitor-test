import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
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
  standalone: true,
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements AfterViewInit {
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
  ngAfterViewInit() {
    this.loaderService.loading$.subscribe((isLoading:any) => {
      console.log('loading$ emitted:', isLoading);
      this.loading = isLoading;
      this.cdr.detectChanges(); 
    });
  }
  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
