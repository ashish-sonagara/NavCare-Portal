import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateAdminDTO } from '../../Model/create-admin.model';
import { LoginAPIService } from '../../Service/login-api-service.service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  private readonly formBuilder = inject(FormBuilder);
  private readonly loginAPIService = inject(LoginAPIService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly signupError = signal('');
  readonly signupSuccess = signal('');

  readonly signupForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z0-9_.]+$/),
    ]],
    phoneNumber: ['', [
      Validators.required,
      Validators.pattern(/^\+?[0-9]{10,15}$/),
    ]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
  });

  onSignUp(): void {
    this.signupError.set('');
    this.signupSuccess.set('');

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const payload = this.signupForm.getRawValue() as CreateAdminDTO;
    this.isSubmitting.set(true);

    this.loginAPIService.signUp(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.signupSuccess.set('Admin account created successfully. Redirecting to login...');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.signupError.set(error?.error?.message || 'Unable to create the account. Please try again.');
      },
    });
  }
}
