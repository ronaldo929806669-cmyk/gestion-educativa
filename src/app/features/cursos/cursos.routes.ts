import { Routes } from '@angular/router';

export const CURSOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./lista-cursos/lista-cursos.component')
        .then(m => m.ListaCursosComponent)
  },
  {
    path: 'nuevo',
    loadComponent: () =>
      import('./editar-curso/editar-curso.component')
        .then(m => m.EditarCursoComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./editar-curso/editar-curso.component')
        .then(m => m.EditarCursoComponent)
  }
];