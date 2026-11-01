import { Routes } from '@angular/router';

/** The family user panel has no sidebar: it is just the patient's details. */
export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/my-patient/my-patient').then((m) => m.MyPatient),
  },
];
