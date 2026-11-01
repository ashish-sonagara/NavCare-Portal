import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/components/login/login').then((m) => m.Login),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./features/auth/components/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'

    // canActivate: [authGuard],
    // children: [
    //   { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    //   {
    //     path: 'dashboard',
    //     loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
    //   },
    //   {
    //     path: 'admin',
    //     canActivate: [roleGuard('ADMIN')],
    //     loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    //   },
    //   {
    //     path: 'staff',
    //     canActivate: [roleGuard('STAFF')],
    //     loadChildren: () => import('./features/staff/staff.routes').then((m) => m.STAFF_ROUTES),
    //   },
    //   {
    //     path: 'user',
    //     canActivate: [roleGuard('USER')],
    //     loadChildren: () => import('./features/user/user.routes').then((m) => m.USER_ROUTES),
    //   },
    // ],
  },
  { path: '**', redirectTo: '' },
];
