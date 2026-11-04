import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'staff' },
  {
    path: 'staff',
    loadComponent: () => import('./components/staff-list/staff-list').then((m) => m.StaffList),
  },
  {
    path: 'staff/new',
    loadComponent: () => import('./components/add-staff/add-staff').then((m) => m.AddStaff),
  },
];
