import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CursosService } from '../../../core/services/cursos.service';
import { Curso } from '../../../core/models/curso.model';
import { NavbarComponent } from '../../../shared/layout/navbar/navbar.component';
import { FechaRelativaPipe } from '../../../shared/pipes/fecha-relativa.pipe'; // ✅ IMPORTAR EL PIPE

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FechaRelativaPipe], // ✅ AGREGAR EL PIPE AQUÍ
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit {
  cursos: Curso[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private cursosService: CursosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.cursosService.getCursos().subscribe({
      next: (data) => {
        this.cursos = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar cursos:', error);
        this.errorMessage = 'Error al cargar los cursos';
        this.isLoading = false;
      }
    });
  }

  nuevoCurso(): void {
    this.router.navigate(['/cursos/nuevo']);
  }

  verDetalle(id: number): void {
    this.router.navigate(['/cursos', id]);
  }

  editarCurso(id: number): void {
    this.router.navigate(['/cursos', 'editar', id]);
  }

  eliminarCurso(id: number): void {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.cursosService.deleteCurso(id).subscribe({
        next: () => {
          this.cargarCursos();
          alert('Curso eliminado correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar el curso');
        }
      });
    }
  }

  getEstadoBadgeClass(activo: boolean): string {
    return activo ? 'badge-activo' : 'badge-inactivo';
  }
}