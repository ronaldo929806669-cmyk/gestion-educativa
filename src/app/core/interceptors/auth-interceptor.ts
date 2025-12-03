import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  // Obtener el token del localStorage
  const token = localStorage.getItem('token');
  
  // Clonar la petición y agregar el token si existe
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  // Enviar la petición y manejar errores
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // Manejar errores de autenticación
      if (error.status === 401) {
        console.error('Error 401: No autorizado');
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        router.navigate(['/login']);
      }
      
      // Manejar errores de permisos
      if (error.status === 403) {
        console.error('Error 403: Acceso prohibido');
        alert('No tienes permisos para realizar esta acción');
      }
      
      // Manejar error de servidor
      if (error.status === 500) {
        console.error('Error 500: Error en el servidor');
        alert('Error en el servidor. Por favor, intenta más tarde.');
      }
      
      // Manejar error de red
      if (error.status === 0) {
        console.error('Error de red: No se pudo conectar con el servidor');
        alert('No se pudo conectar con el servidor. Verifica tu conexión.');
      }
      
      return throwError(() => error);
    })
  );
};