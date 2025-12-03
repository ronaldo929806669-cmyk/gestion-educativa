import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoBadge',
  standalone: true
})
export class EstadoBadgePipe implements PipeTransform {
  transform(activo: boolean): string {
    return activo ? '✅ Activo' : '❌ Inactivo';
  }
}