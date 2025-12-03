export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  rol: 'admin' | 'profesor' | 'estudiante';
  activo: boolean;
  fechaRegistro?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
  expiresIn: number;
}