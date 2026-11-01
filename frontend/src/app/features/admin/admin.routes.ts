import { Routes } from '@angular/router';
import { PanelLayout } from '../../layout/panel-layout/panel-layout';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: PanelLayout,
    data: {
      title: 'Admin Panel',
      nav: [{ label: 'Staff', path: '/admin/staff' }],
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'staff' },
      {
        path: 'staff',
        loadComponent: () => import('./components/staff-list/staff-list').then((m) => m.StaffList),
      },
      {
        path: 'staff/new',
        loadComponent: () => import('./components/add-staff/add-staff').then((m) => m.AddStaff),
      },
    ],
  },
];
