import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  const token = authService.getToken();
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
        toast.error('Tu sesión expiró, inicia sesión de nuevo.');
        router.navigate(['/login']);
      } else if (error.status === 0) {
        toast.error('No se pudo conectar con el servidor.');
      } else if (error.error?.error) {
        toast.error(error.error.error);
      } else if (typeof error.error === 'object' && error.error) {
        // errores de validación (mapa campo -> mensaje)
        const firstMessage = Object.values(error.error)[0];
        if (typeof firstMessage === 'string') toast.error(firstMessage);
      }
      return throwError(() => error);
    })
  );
};
