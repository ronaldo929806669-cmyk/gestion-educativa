import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

export const USUARIO_ROUTES: Routes = [
  {
    path: '',
    component: ListaUsuariosComponent
  },
  {
    path: 'nuevo',  // ✅ AGREGAR ESTA RUTA
    component: EditarUsuarioComponent
  },
  {
    path: 'editar/:id',
    component: EditarUsuarioComponent
  }
];