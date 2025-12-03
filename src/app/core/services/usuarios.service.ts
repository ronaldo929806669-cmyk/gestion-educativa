import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../../environments/environment'; // ✅ IMPORTAR

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = environment.apiUrl; // ✅ USAR ENVIRONMENT (aunque uses mock)
  
  // 🔥 DATOS SIMULADOS (Mock)
  private usuariosMock: Usuario[] = [
    {
      id: 1,
      nombre: 'Ronaldo',
      apellido: 'Ponce',
      email: 'admin@escuela.com',
      rol: 'admin',
      activo: true,
      fechaRegistro: new Date('2024-01-15')
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'García',
      email: 'maria.garcia@escuela.com',
      rol: 'profesor',
      activo: true,
      fechaRegistro: new Date('2024-02-10')
    },
    {
      id: 3,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@escuela.com',
      rol: 'estudiante',
      activo: true,
      fechaRegistro: new Date('2024-03-05')
    },
    {
      id: 4,
      nombre: 'Ana',
      apellido: 'López',
      email: 'ana.lopez@escuela.com',
      rol: 'estudiante',
      activo: false,
      fechaRegistro: new Date('2024-01-20')
    }
  ];

  constructor() {}

  getUsuarios(): Observable<Usuario[]> {
    return of(this.usuariosMock).pipe(delay(500));
  }

  getUsuario(id: number): Observable<Usuario> {
    const usuario = this.usuariosMock.find(u => u.id === id);
    if (usuario) {
      return of(usuario).pipe(delay(300));
    }
    return throwError(() => new Error('Usuario no encontrado'));
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    const nuevoUsuario = {
      ...usuario,
      id: Math.max(...this.usuariosMock.map(u => u.id || 0)) + 1,
      fechaRegistro: new Date()
    };
    this.usuariosMock.push(nuevoUsuario);
    return of(nuevoUsuario).pipe(delay(300));
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    const index = this.usuariosMock.findIndex(u => u.id === id);
    if (index !== -1) {
      this.usuariosMock[index] = { ...usuario, id };
      return of(this.usuariosMock[index]).pipe(delay(300));
    }
    return throwError(() => new Error('Usuario no encontrado'));
  }

  deleteUsuario(id: number): Observable<void> {
    const index = this.usuariosMock.findIndex(u => u.id === id);
    if (index !== -1) {
      this.usuariosMock.splice(index, 1);
      return of(void 0).pipe(delay(300));
    }
    return throwError(() => new Error('Usuario no encontrado'));
  }
}