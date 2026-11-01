
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-patient.html',
})
export class AddPatient {

}
