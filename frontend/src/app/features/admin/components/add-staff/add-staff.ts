import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Role } from '../../../../core/enum/role.enum';
import { SessionService } from '../../../../core/services/session.service';
import { AppInput } from '../../../../shared/components/app-input/app-input';
import { StaffDTO } from '../../model/staff.model';
import { StaffAPIService } from '../../service/staff-api.service';

@Component({
  selector: 'app-add-staff',
  imports: [ReactiveFormsModule, RouterLink, AppInput],
  templateUrl: './add-staff.html',
  styleUrl: './add-staff.scss',
})
export class AddStaff {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly staffApiService = inject(StaffAPIService);
  private readonly sessionService = inject(SessionService);

  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly staffForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  fieldError(controlName: keyof typeof this.staffForm.controls): string | null {
    const control = this.staffForm.controls[controlName];
    if (!control.touched || !control.errors) return null;
    if (control.errors['required']) return 'This field is required';
    if (control.errors['email']) return 'Enter a valid email address';
    if (control.errors['pattern']) return 'Phone number must have exactly 10 digits';
    if (control.errors['minlength']) return 'Password must contain at least 8 characters';
    return null;
  }

  save(): void {
    if (this.staffForm.invalid) {
      this.staffForm.markAllAsTouched();
      return;
    }

    const admin = this.sessionService.loggedInUser();
    if (!admin) {
      this.error.set('Unable to identify the logged-in admin.');
      return;
    }

    const formValue = this.staffForm.getRawValue();
    const staff = new StaffDTO();
    Object.assign(staff, formValue, { role: Role.STAFF, adminID: admin.userID });

    this.saving.set(true);
    this.error.set(null);

    this.staffApiService.addStaff(staff).subscribe({
      next: (response: any) => {
        this.saving.set(false);
        if (response?.success === false) {
          this.error.set(response.message ?? 'Unable to add staff.');
          return;
        }
        this.router.navigate(['/admin/staff']);
      },
      error: (response: any) => {
        this.saving.set(false);
        this.error.set(response?.message ?? 'Unable to add staff.');
      },
    });
  }
}
