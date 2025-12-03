import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { Usuario } from '../../../core/models/usuario.model';
import { NavbarComponent } from '../../../shared/layout/navbar/navbar.component';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.errorMessage = 'Error al cargar los usuarios';
        this.isLoading = false;
      }
    });
  }

  nuevoUsuario(): void {
    this.router.navigate(['/usuarios/nuevo']);
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/usuarios/editar', id]);
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(id).subscribe({
        next: () => {
          this.cargarUsuarios();
          alert('Usuario eliminado correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar el usuario');
        }
      });
    }
  }

  // ✅ NUEVOS MÉTODOS
  getInitials(nombre: string, apellido: string): string {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  }

  getRolLabel(rol: string): string {
    const roles: { [key: string]: string } = {
      'admin': 'Administrador',
      'profesor': 'Profesor',
      'estudiante': 'Estudiante'
    };
    return roles[rol] || rol;
  }

  getRolBadgeClass(rol: string): string {
    return `rol-${rol}`;
  }

  getEstadoBadgeClass(activo: boolean): string {
    return activo ? 'estado-activo' : 'estado-inactivo';
  }
}