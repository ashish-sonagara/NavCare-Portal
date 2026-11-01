import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-patient',
  imports: [DatePipe],
  templateUrl: './my-patient.html',
  styleUrl: './my-patient.scss',
})
export class MyPatient {


  constructor() {
  }
}
