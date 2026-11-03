import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const roleGuard =
  (role: 'ADMIN' | 'STAFF' | 'PATIENT'
  ): CanActivateFn =>
  () => {
    const user = inject(SessionService).getLoggedInUser();
    if (!user) {
      return inject(Router).createUrlTree(['/login']);
    }

    return user.role === role
      ? true
      : inject(Router).createUrlTree(['/login']);
  };
