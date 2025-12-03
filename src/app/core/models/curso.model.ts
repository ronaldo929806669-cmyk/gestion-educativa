export interface Curso {
  id?: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  profesor: string;
  duracion: number;
  creditos: number;
  estudiantes: number;
  nivel: string;
  fechaInicio?: Date;    // ✅ Opcional
  fechaFin?: Date;       // ✅ Opcional
  activo: boolean;
}