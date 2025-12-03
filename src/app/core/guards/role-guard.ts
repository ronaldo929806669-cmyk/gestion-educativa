import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // ✅ CORREGIDO: Obtener el usuario del localStorage (clave correcta)
  const usuarioStr = localStorage.getItem('currentUser');
  
  if (!usuarioStr) {
    console.log('❌ No hay usuario en sesión');
    router.navigate(['/login']);
    return false;
  }
  
  const usuario = JSON.parse(usuarioStr);
  const rolesPermitidos = route.data['roles'] as string[];
  
  // Verificar si el rol del usuario está en los roles permitidos
  if (rolesPermitidos && rolesPermitidos.includes(usuario.rol)) {
    console.log('✅ Acceso permitido. Rol:', usuario.rol);
    return true;
  }
  
  // Si no tiene permiso, mostrar mensaje y redirigir
  console.log(`❌ Acceso denegado. Rol requerido: ${rolesPermitidos.join(', ')}, Rol actual: ${usuario.rol}`);
  alert('No tienes permisos para acceder a esta sección');
  router.navigate(['/dashboard']);
  
  return false;
};