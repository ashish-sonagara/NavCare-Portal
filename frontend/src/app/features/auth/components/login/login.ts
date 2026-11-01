import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginAPIService } from '../../Service/LoginAPIService.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private loginAPIService = inject(LoginAPIService)

  readonly loginError = signal('');

  readonly loginForm = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    let payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    
    this.loginAPIService.Login(payload).subscribe({
      next: (res) => {
        console.log('Login successful', res);
      },
      error: (error) => {
        console.log('Login failed', error);
      }
    })
  }
}
