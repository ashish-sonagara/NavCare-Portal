import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-staff-list',
  imports: [RouterLink],
  templateUrl: './staff-list.html',
})
export class StaffList {

  // protected readonly staff = signal<User[] | null>(null);
  // protected readonly error = signal<string | null>(null);

  constructor() {
  }
}
