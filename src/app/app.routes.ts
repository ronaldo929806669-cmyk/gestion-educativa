import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { loginGuard } from './core/guards/login.guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  // ✅ Ruta raíz con /
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  
  // ✅ Login público
  {
    path: 'login',
    loadComponent: () => 
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },
  
  // ✅ Dashboard protegido con Lazy Loading
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes')
        .then(m => m.dashboardRoutes),
    canActivate: [authGuard]
  },
  
  // ✅ Usuarios con Lazy Loading y rol admin
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./features/usuarios/usuario.routes')
        .then(m => m.USUARIO_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  
  // ✅ Cursos con Lazy Loading
  {
    path: 'cursos',
    loadChildren: () =>
      import('./features/cursos/cursos.routes')
        .then(m => m.CURSOS_ROUTES),
    canActivate: [authGuard]
  },
  
  // ✅ Ruta 404 - SIEMPRE AL FINAL
  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found/not-found.component')
        .then(m => m.NotFoundComponent)
  }
];