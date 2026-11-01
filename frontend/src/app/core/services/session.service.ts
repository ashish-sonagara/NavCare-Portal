import { Injectable, signal } from '@angular/core';
import { UserDTO } from '../models/logged-user.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly session = sessionStorage;

  setLoggedInUser(user: UserDTO): void {
    this.session.setItem('userDTO', JSON.stringify(user));
  }

  getLoggedInUser(): UserDTO | null {
    const value = this.session.getItem('userDTO');
    return value ? JSON.parse(value) as UserDTO : null;
  }

  isLoggedIn(): boolean {
    return this.getLoggedInUser() !== null;
  }

  removeLoggedInUser(): void {
    this.session.removeItem('userDTO');
  }
}