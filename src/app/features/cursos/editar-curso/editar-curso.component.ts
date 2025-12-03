import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {
  cursoForm: FormGroup;
  esNuevo: boolean = true;
  cursoId: number | null = null;
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cursoForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: [''],
      creditos: [3, [Validators.required, Validators.min(1)]],
      profesor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esNuevo = false;
      this.cursoId = +id;
      this.cargarCurso(this.cursoId);
    }
  }

  cargarCurso(id: number): void {
    this.http.get(`http://localhost:3000/cursos/${id}`).subscribe({
      next: (curso: any) => {
        this.cursoForm.patchValue(curso);
      },
      error: (error) => {
        console.error('Error al cargar curso:', error);
        this.errorMessage = 'Error al cargar el curso';
      }
    });
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      this.loading = true;
      const request = this.esNuevo
        ? this.http.post('http://localhost:3000/cursos', this.cursoForm.value)
        : this.http.put(`http://localhost:3000/cursos/${this.cursoId}`, this.cursoForm.value);

      request.subscribe({
        next: () => {
          this.successMessage = `Curso ${this.esNuevo ? 'creado' : 'actualizado'} exitosamente`;
          setTimeout(() => {
            this.router.navigate(['/cursos']);
          }, 1500);
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Error al guardar el curso';
          this.loading = false;
        }
      });
    }
  }
}