# 🎓 Sistema de Gestión Educativa

Aplicación web desarrollada en Angular para la gestión de cursos, usuarios y estudiantes con autenticación JWT y control de acceso por roles.

## 🚀 Características

- ✅ Autenticación con JWT
- ✅ Control de acceso por roles (Administrador, Profesor, Estudiante)
- ✅ CRUD completo de cursos y usuarios
- ✅ Protección de rutas con Guards
- ✅ Navegación SPA
- ✅ Interfaz responsiva con Bootstrap

## 🛠️ Tecnologías

- Angular 19
- TypeScript 5.6
- Bootstrap 5
- RxJS

## 📋 Requisitos Previos

- Node.js v18 o superior
- npm v9 o superior
- Angular CLI v19

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/ronaldo929806669-cmyk/gestion-educativa.git
cd gestion-educativa
```

### 2. Instalar dependencias
```bash
npm install
```

## ▶️ Ejecución
```bash
ng serve
```

La aplicación estará disponible en: **http://localhost:4200**

## 🔐 Credenciales de Prueba

**Administrador:**
- Email: admin@escuela.com
- Contraseña: admin123

**Profesor:**
- Email: profesor@escuela.com
- Contraseña: profe123

**Estudiante:**
- Email: estudiante@escuela.com
- Contraseña: est123

## 📁 Estructura del Proyecto
```
src/app/
├── core/           # Guards, interceptores, servicios
├── features/       # Módulos (auth, dashboard, cursos, usuarios)
└── shared/         # Componentes compartidos
```

## 🛡️ Seguridad

- JWT almacenado en localStorage
- Guards para protección de rutas
- Interceptores HTTP para tokens automáticos

## 👥 Equipo de Desarrollo

- Ronaldo Ponce Huamali
- [Nombre Compañero 2]
- [Nombre Compañero 3]

## 📞 Contacto

- Email: ronaldo929806669@gmail.com
- GitHub: [@ronaldo929806669-cmyk](https://github.com/ronaldo929806669-cmyk)

---

**Desarrollado con ❤️ usando Angular**