import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Guardar la URL que el usuario intentó acceder
  const returnUrl = state.url;
  console.log('Usuario no autenticado. Redirigiendo a login con returnUrl:', returnUrl);

  // Redirigir al login y pasar la URL de retorno como query param
  router.navigate(['/login'], { queryParams: { returnUrl } });
  
  return false;
};