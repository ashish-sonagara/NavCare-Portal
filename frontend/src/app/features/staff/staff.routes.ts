import { Routes } from '@angular/router';
import { PanelLayout } from '../../layout/panel-layout/panel-layout';

export const STAFF_ROUTES: Routes = [
  {
    path: '',
    component: PanelLayout,
    data: {
      title: 'Staff Panel',
      nav: [{ label: 'Patients', path: '/staff/patients' }],
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'patients' },
      {
        path: 'patients',
        loadComponent: () => import('./components/patient-list/patient-list').then((m) => m.PatientList),
      },
      {
        path: 'patients/new',
        loadComponent: () => import('./components/add-patient/add-patient').then((m) => m.AddPatient),
      },
    ],
  },
];
