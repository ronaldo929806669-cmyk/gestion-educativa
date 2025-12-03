import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolFormato',
  standalone: true
})
export class RolFormatoPipe implements PipeTransform {
  transform(rol: 'admin' | 'profesor' | 'estudiante'): string {
    const formatosRol = {
      'admin': '👑 Administrador',
      'profesor': '👨‍🏫 Profesor',
      'estudiante': '🎓 Estudiante'
    };
    
    return formatosRol[rol] || rol;
  }
}