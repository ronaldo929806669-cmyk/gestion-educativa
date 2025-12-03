import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, Usuario } from '../models/usuario.model';
import { environment } from '../../../environments/environment'; // ✅ IMPORTAR

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // ✅ USAR ENVIRONMENT
  
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.loginSimulado(credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.usuario));
        this.currentUserSubject.next(response.usuario);
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => new Error('Error de autenticación'));
      })
    );
  }

  private loginSimulado(credentials: LoginRequest): Observable<LoginResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        if (credentials.email === 'admin@escuela.com' && credentials.password === 'admin123') {
          observer.next({
            token: 'fake-jwt-token-admin-' + Date.now(),
            usuario: {
              id: 1,
              nombre: 'Ronaldo',
              apellido: 'Ponce',
              email: 'admin@escuela.com',
              rol: 'admin',
              activo: true
            },
            expiresIn: 3600
          });
          observer.complete();
        } else if (credentials.email === 'profesor@escuela.com' && credentials.password === 'profe123') {
          observer.next({
            token: 'fake-jwt-token-profesor-' + Date.now(),
            usuario: {
              id: 2,
              nombre: 'María',
              apellido: 'García',
              email: 'profesor@escuela.com',
              rol: 'profesor',
              activo: true
            },
            expiresIn: 3600
          });
          observer.complete();
        } else if (credentials.email === 'estudiante@escuela.com' && credentials.password === 'est123') {
          observer.next({
            token: 'fake-jwt-token-estudiante-' + Date.now(),
            usuario: {
              id: 3,
              nombre: 'Carlos',
              apellido: 'López',
              email: 'estudiante@escuela.com',
              rol: 'estudiante',
              activo: true
            },
            expiresIn: 3600
          });
          observer.complete();
        } else {
          observer.error({ error: { message: 'Credenciales incorrectas' } });
        }
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const user = this.currentUserValue;
    return !!token && !!user;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    return user ? roles.includes(user.rol) : false;
  }

  getUserRole(): string | null {
    const user = this.currentUserValue;
    return user ? user.rol : null;
  }
}