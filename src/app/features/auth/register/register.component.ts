import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      rol: ['estudiante', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }

      this.loading = true;
      const userData = {
        nombre: this.registerForm.value.nombre,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        rol: this.registerForm.value.rol
      };

      this.http.post('http://localhost:3000/users', userData).subscribe({
        next: () => {
          this.successMessage = 'Registro exitoso. Redirigiendo al login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Error al registrar usuario';
          this.loading = false;
        }
      });
    }
  }
}