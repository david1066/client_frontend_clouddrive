import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../app/services/authentication.service'; 

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Token expirado o no válido
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};