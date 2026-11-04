import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginAPIService } from '../../Service/login-api-service.service';
import { LoginDTO } from '../../Model/login.model';
import { SessionService } from '../../../../core/services/session.service';
import { Role } from '../../../../core/enum/role.enum';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private loginAPIService = inject(LoginAPIService);
  private sessionService = inject(SessionService);
  private readonly router = inject(Router);

  readonly Role = Role
  isLogging = signal<boolean>(false);
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

    this.loginError.set('');
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (!username || !password) {
      return;
    }

    this.isLogging.set(true);
    const payload: LoginDTO = {
      username,
      password
    }
    
    this.loginAPIService.login(payload).subscribe({
      next: (res) => {
        const data = res.data;
        this.isLogging.set(false);
        this.sessionService.setLoggedInUser(data);

        const destination = data.role === this.Role.ADMIN
          ? '/admin/staff'
          : data.role === this.Role.STAFF
            ? '/staff/patients'
            : '/user';
            
        void this.router.navigateByUrl(destination);
      },
      error: (error) => {
        this.isLogging.set(false);
        this.loginError.set('Error while logging!');
        console.log('Login failed', error);
      }
    })
  }
}
