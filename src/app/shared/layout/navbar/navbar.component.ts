import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser: Usuario | null = null;
  menuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    if (confirm('¿Estás seguro de cerrar sesión?')) {
      this.authService.logout();
    }
  }

  isAdmin(): boolean {
    return this.currentUser?.rol === 'admin';
  }

  isProfesor(): boolean {
    return this.currentUser?.rol === 'profesor' || this.isAdmin();
  }
}