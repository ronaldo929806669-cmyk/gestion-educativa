import { Routes } from '@angular/router';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';

export const cursosRoutes: Routes = [
  {
    path: '',
    component: ListaCursosComponent
  },
  {
    path: 'nuevo',
    component: EditarCursoComponent
  },
  {
    path: 'editar/:id',
    component: EditarCursoComponent
  }
];