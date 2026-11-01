import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/** Allows the route only for the given role; anyone else lands on the dashboard. */
export const roleGuard =
  (role: string): CanActivateFn =>
  () => {
    const userRole = globalThis.localStorage?.getItem('role');
    return userRole === role
      ? true
      : inject(Router).createUrlTree(['/dashboard']);
  };
