/* import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
}; */

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Solo agregamos el token si el usuario está logueado
  if (authService.isLoggedIn()) {
    const token = localStorage.getItem('gastos_app_token');
    
    if (token) {
      // Clonamos la petición y le agregamos el header Authorization
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(clonedReq);
    }
  }
  
  // Si no hay token, pasamos la petición original sin modificar
  return next(req);
};

