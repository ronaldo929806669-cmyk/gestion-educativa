export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    rol: string;
  };
}