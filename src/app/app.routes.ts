import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './features/list/list.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'items', component: ListComponent },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
