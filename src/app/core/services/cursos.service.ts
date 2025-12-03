import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Curso } from '../models/curso.model';
import { environment } from '../../../environments/environment'; // ✅ IMPORTAR

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = environment.apiUrl; // ✅ USAR ENVIRONMENT (aunque uses mock)
  
  private cursosMock: Curso[] = [
    {
      id: 1,
      codigo: 'ANG-101',
      nombre: 'Desarrollo Web con Angular',
      descripcion: 'Aprende a crear aplicaciones web modernas con Angular',
      profesor: 'Dr. Carlos Méndez',
      duracion: 40,
      creditos: 4,
      estudiantes: 25,
      nivel: 'Intermedio',
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-05-30'),
      activo: true
    },
    {
      id: 2,
      codigo: 'TS-100',
      nombre: 'Introducción a TypeScript',
      descripcion: 'Fundamentos de TypeScript para desarrollo',
      profesor: 'Dra. Ana Torres',
      duracion: 20,
      creditos: 2,
      estudiantes: 30,
      nivel: 'Principiante',
      fechaInicio: new Date('2024-02-15'),
      fechaFin: new Date('2024-03-15'),
      activo: true
    },
    {
      id: 3,
      codigo: 'NODE-201',
      nombre: 'Node.js y Express',
      descripcion: 'Backend con Node.js y Express Framework',
      profesor: 'Ing. Roberto Silva',
      duracion: 35,
      creditos: 3,
      estudiantes: 20,
      nivel: 'Intermedio',
      fechaInicio: new Date('2024-04-01'),
      fechaFin: new Date('2024-06-15'),
      activo: true
    },
    {
      id: 4,
      codigo: 'DB-150',
      nombre: 'Bases de Datos SQL',
      descripcion: 'Diseño y gestión de bases de datos relacionales',
      profesor: 'Lic. María González',
      duracion: 30,
      creditos: 3,
      estudiantes: 28,
      nivel: 'Principiante',
      fechaInicio: new Date('2024-03-10'),
      fechaFin: new Date('2024-05-10'),
      activo: true
    },
    {
      id: 5,
      codigo: 'REACT-202',
      nombre: 'React Avanzado',
      descripcion: 'Desarrollo avanzado con React y Redux',
      profesor: 'Ing. Pedro Ramírez',
      duracion: 45,
      creditos: 4,
      estudiantes: 15,
      nivel: 'Avanzado',
      fechaInicio: new Date('2024-05-01'),
      fechaFin: new Date('2024-07-31'),
      activo: false
    }
  ];

  constructor() {}

  getCursos(): Observable<Curso[]> {
    return of(this.cursosMock).pipe(delay(500));
  }

  getCurso(id: number): Observable<Curso> {
    const curso = this.cursosMock.find(c => c.id === id);
    if (curso) {
      return of(curso).pipe(delay(300));
    }
    return throwError(() => new Error('Curso no encontrado'));
  }

  createCurso(curso: Curso): Observable<Curso> {
    const nuevoCurso = {
      ...curso,
      id: Math.max(...this.cursosMock.map(c => c.id || 0)) + 1
    };
    this.cursosMock.push(nuevoCurso);
    return of(nuevoCurso).pipe(delay(300));
  }

  updateCurso(id: number, curso: Curso): Observable<Curso> {
    const index = this.cursosMock.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cursosMock[index] = { ...curso, id };
      return of(this.cursosMock[index]).pipe(delay(300));
    }
    return throwError(() => new Error('Curso no encontrado'));
  }

  deleteCurso(id: number): Observable<void> {
    const index = this.cursosMock.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cursosMock.splice(index, 1);
      return of(void 0).pipe(delay(300));
    }
    return throwError(() => new Error('Curso no encontrado'));
  }
}