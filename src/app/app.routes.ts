import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'  
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { 
        path: 'dashboard', 
        canActivate: [authGuard], 
        component: DashboardComponent 
      },
      { 
        path: 'items', 
        canActivate: [authGuard], 
        loadChildren: () => import('./features/list/list.module').then(m => m.ListModule)
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
