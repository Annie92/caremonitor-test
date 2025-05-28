import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './features/list/list.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'items',
        component: ListComponent
    }
];
