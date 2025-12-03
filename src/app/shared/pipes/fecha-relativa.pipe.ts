import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaRelativa',
  standalone: true
})
export class FechaRelativaPipe implements PipeTransform {
  transform(value: Date | string | undefined | null): string {
    // ✅ Manejar valores undefined o null
    if (!value) {
      return 'Sin fecha';
    }

    try {
      const fecha = new Date(value);
      
      // ✅ Validar que la fecha sea válida
      if (isNaN(fecha.getTime())) {
        return 'Fecha inválida';
      }

      const ahora = new Date();
      const diff = ahora.getTime() - fecha.getTime();
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      // Fechas futuras
      if (dias < 0) {
        const diasFuturos = Math.abs(dias);
        if (diasFuturos === 0) return 'Hoy';
        if (diasFuturos === 1) return 'Mañana';
        if (diasFuturos < 7) return `En ${diasFuturos} días`;
        if (diasFuturos < 30) return `En ${Math.floor(diasFuturos / 7)} semanas`;
        return `En ${Math.floor(diasFuturos / 30)} meses`;
      }
      
      // Fechas pasadas
      if (dias === 0) return 'Hoy';
      if (dias === 1) return 'Ayer';
      if (dias < 7) return `Hace ${dias} días`;
      if (dias < 30) return `Hace ${Math.floor(dias / 7)} semanas`;
      if (dias < 365) return `Hace ${Math.floor(dias / 30)} meses`;
      return `Hace ${Math.floor(dias / 365)} años`;
    } catch (error) {
      return 'Fecha inválida';
    }
  }
}