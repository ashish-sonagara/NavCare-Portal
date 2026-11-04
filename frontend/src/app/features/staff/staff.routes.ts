import { Routes } from '@angular/router';

export const STAFF_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'patients' },
  {
    path: 'patients',
    loadComponent: () => import('./components/patient-list/patient-list').then((m) => m.PatientList),
  },
  {
    path: 'patients/new',
    loadComponent: () => import('./components/add-patient/add-patient').then((m) => m.AddPatient),
  },
];
