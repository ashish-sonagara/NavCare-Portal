import { Injectable, signal } from '@angular/core';
import { UserDTO } from '../models/logged-user.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly session = sessionStorage;

  readonly loggedInUser = signal<UserDTO | null>(this.getLoggedInUser());
  readonly isLoggedIn = this.loggedInUser.asReadonly();

  setLoggedInUser(user: UserDTO): void {
    this.session.setItem('userDTO', JSON.stringify(user));
    this.loggedInUser.set(user)
  }

  getLoggedInUser(): UserDTO | null {
    const value = this.session.getItem('userDTO');
    return value ? JSON.parse(value) as UserDTO : null;
  }

  removeLoggedInUser(): void {
    this.session.removeItem('userDTO');
    this.loggedInUser.set(null)
  }
}