import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = () => {
  const sessionService = inject(SessionService);
  return sessionService.isLoggedIn()
    ? true
    : inject(Router).createUrlTree(['/login']);
};
