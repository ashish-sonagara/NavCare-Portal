import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = globalThis.localStorage?.getItem('token');
  /* const authed = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  */
  /* const authed = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  */
  const authed = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authed).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !req.url.endsWith('/auth/login')) {
        globalThis.localStorage?.removeItem('token');
        globalThis.localStorage?.removeItem('role');
      }
      return throwError(() => err);
    }),
  );
};
