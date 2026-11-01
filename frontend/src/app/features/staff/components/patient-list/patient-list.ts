import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Patient {
  id: number | string;
  patientCode: string;
  name: string;
  age: number;
  ward?: string;
  bedNumber?: string;
  currentCondition: string;
  surgeryRequired: boolean;
  familyContactName: string;
  familyContactPhone: string;
}

@Component({
  selector: 'app-patient-list',
  imports: [RouterLink],
  templateUrl: './patient-list.html',
})
export class PatientList {

  protected readonly patients = signal<Patient[] | null>(null);
  protected readonly error = signal<string | null>(null);

  constructor() {
   
  }
}
