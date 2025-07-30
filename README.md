# INNOVATECH - Frontend Web

![Badge de Estado](https://img.shields.io/badge/Estado-Producción-green)
![Badge de Versión](https://img.shields.io/badge/Versión-v1.0-blue)
![Badge de Licencia](https://img.shields.io/badge/Licencia-MIT-green)

## 📖 Descripción

**INNOVATECH Frontend** es la interfaz web moderna y responsive para el sistema de gestión de vacantes de empleo. Desarrollada con Angular 18, proporciona una experiencia de usuario intuitiva y completa para administradores, empresas y candidatos. Integra completamente con la API REST del backend para ofrecer funcionalidades completas de gestión de empleos.

## ✨ Características

- **Interfaz moderna** con Angular 18 y Bootstrap 5
- **Autenticación JWT** con guards y interceptors
- **Dashboards personalizados** para cada tipo de usuario
- **Tablas CRUD interactivas** con filtros y búsqueda
- **Cards dinámicas** con funcionalidades completas
- **Responsive design** optimizado para todos los dispositivos
- **Notificaciones elegantes** con SweetAlert2
- **Navegación protegida** por roles y permisos
- **Landing page atractiva** con video de presentación

## 🚀 Demo

**🔗 Aplicación en vivo:** [https://vacantes.adriancc.com/](https://vacantes.adriancc.com/)

**🔗 API Backend:** [https://api-vacantes.adriancc.com/swagger-ui/index.html](https://api-vacantes.adriancc.com/swagger-ui/index.html)

## 📸 Capturas de pantalla

### Landing Page
![Landing Page](./screenshots/landing-page.png)

### Login
![Login](./screenshots/login.png)

### Dashboard Administrador
![Dashboard Admin](./screenshots/dashboard-admin.png)

### Gestión de Empresas (Admin)
![CRUD Empresas](./screenshots/crud-empresas.png)

### Dashboard Empresa
![Dashboard Empresa](./screenshots/dashboard-empresa.png)

### Crear Vacante (Empresa)
![Crear Vacante](./screenshots/crear-vacante.png)

### Gestión de Solicitudes (Empresa)
![Gestión Solicitudes](./screenshots/gestion-solicitudes.png)

### Dashboard Cliente
![Dashboard Cliente](./screenshots/dashboard-cliente.png)

### Búsqueda de Vacantes (Cliente)
![Búsqueda Vacantes](./screenshots/busqueda-vacantes.png)

### Solicitar Vacante (Cliente)
![Solicitar Vacante](./screenshots/solicitar-vacante.png)

### Mis Solicitudes (Cliente)
![Mis Solicitudes](./screenshots/mis-solicitudes.png)

## 🧪 Credenciales de Prueba

Para probar todas las funcionalidades del sistema:

| Rol | Email | Password | Funcionalidades Principales |
|-----|-------|----------|------------------------------|
| 👨‍💼 **Administrador** | admin@empleoreto.com | admin123 | Gestión completa de empresas, categorías y usuarios |
| 🏢 **Empresa/RRHH** | rrhh@tecnosoluciones.com | empresa123 | Publicar vacantes, gestionar solicitudes |
| 👤 **Cliente** | juan.perez@mail.com | cliente123 | Buscar empleos, enviar solicitudes |

### 🚀 Cómo probar:
1. **Accede a la aplicación:** [https://vacantes.adriancc.com/](https://vacantes.adriancc.com/)
2. **Haz clic en "Login"**
3. **Usa cualquiera de las credenciales** de la tabla arriba
4. **Explora el dashboard** específico de tu rol
5. **Prueba todas las funcionalidades** según los permisos

## 📱 Funcionalidades por Rol

### 👨‍💼 **Administrador**
- **Gestión de Empresas:** Alta, baja, modificación y visualización completa
- **Gestión de Categorías:** CRUD completo de categorías de empleo
- **Gestión de Usuarios:** Dar de baja usuarios por mal uso (enabled = 0)
- **Gestión de Administradores:** CRUD de usuarios con perfil "ADMON"
- **Dashboard estadístico:** Métricas generales del sistema
- **Tablas interactivas:** Con filtros, búsqueda y paginación

### 🏢 **Empresa/RRHH**
- **Publicación de Vacantes:** Crear nuevas ofertas de empleo (estado "CREADA")
- **Gestión de Vacantes:** Ver, editar o cancelar vacantes publicadas
- **Recepción de Solicitudes:** Revisar currículums y gestionar postulaciones
- **Asignación de Candidatos:** Cambiar vacante a "ASIGNADA" y solicitud a adjudicada
- **Perfil de Empresa:** Modificar datos corporativos
- **Dashboard empresarial:** Estadísticas de vacantes y solicitudes

### 👤 **Cliente/Candidato**
- **Registro de Usuario:** Crear cuenta nueva en el sistema
- **Búsqueda Avanzada:** Filtros por empresa, categoría, tipo de contrato
- **Postulación a Vacantes:** Enviar solicitudes con currículum y detalles
- **Seguimiento de Solicitudes:** Estado de postulaciones y respuestas
- **Cancelación de Solicitudes:** Opción de retirar postulaciones
- **Perfil personal:** Gestión de datos personales

## 🛠️ Tecnologías utilizadas

### Frontend Framework
- **Angular:** 18.2.0
- **TypeScript:** 5.5.2
- **RxJS:** 7.8.0 (Observables y programación reactiva)

### UI & Estilos
- **Bootstrap:** 5.3.5
- **Bootstrap Icons:** 1.12.1
- **FontAwesome:** 6.7.2
- **Custom CSS:** Estilos personalizados

### UX & Interactividad
- **SweetAlert2:** 11.18.0 (Notificaciones elegantes)
- **Angular Animations:** Transiciones fluidas

### Arquitectura
- **Guards:** Protección de rutas por autenticación y roles
- **Interceptors:** Manejo automático de tokens JWT
- **Services:** Comunicación con API mediante HttpClient
- **Interfaces:** Tipado fuerte con TypeScript

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16.0.0 o superior)
- [npm](https://www.npmjs.com/) (versión 8.0.0 o superior)
- [Angular CLI](https://angular.io/cli) (versión 18.0.0 o superior)
- [Git](https://git-scm.com/)

## ⚙️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tuusuario/innovatech-frontend.git
   ```

2. **Navega al directorio del proyecto**
   ```bash
   cd innovatech-frontend
   ```

3. **Instala las dependencias**
   ```bash
   npm install
   ```

4. **Configura la URL de la API**
   ```typescript
   // En src/environments/environment.ts
   export const environment = {
     production: false,
     apiUrl: 'https://api-vacantes.adriancc.com'
   };
   ```

5. **Ejecuta la aplicación**
   ```bash
   ng serve
   ```

6. **Abre tu navegador y visita**
   ```
   http://localhost:4200
   ```

## 🏗️ Estructura del proyecto

```
VacantesFront/
├── .vscode/                              # Configuración VS Code
├── public/
│   ├── assets/
│   │   ├── fonts/                        # Fuentes personalizadas
│   │   ├── img/                          # Imágenes del proyecto
│   │   └── videos/                       # Video de landing page
│   ├── edificios.png
│   ├── logo.png
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── components/                   # Componentes reutilizables
│   │   │   ├── navbar/                   # Barra de navegación
│   │   │   ├── card-vacante/             # Tarjetas de vacantes
│   │   │   ├── card-solicitudes/         # Tarjetas de solicitudes
│   │   │   ├── card-postulante/          # Tarjetas de postulantes
│   │   │   ├── categorias-crudtable/     # Tabla CRUD categorías
│   │   │   └── usuarios-crudtable/       # Tabla CRUD usuarios
│   │   ├── guards/
│   │   │   └── login.guard.ts            # Protección de rutas
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts       # Interceptor JWT
│   │   ├── interfaces/                   # Interfaces TypeScript
│   │   │   ├── ilogin.ts
│   │   │   ├── iuser.ts
│   │   │   ├── ivacante-*.ts
│   │   │   ├── iempresa-*.ts
│   │   │   └── isolicitudes.ts
│   │   ├── pages/                        # Páginas principales
│   │   │   ├── landing-page/             # Página de inicio
│   │   │   ├── login/                    # Inicio de sesión
│   │   │   ├── registro/                 # Registro de usuarios
│   │   │   ├── home/                     # Dashboard principal
│   │   │   ├── admin-*/                  # Páginas de administrador
│   │   │   ├── empresa-*/                # Páginas de empresa
│   │   │   ├── cliente-*/                # Páginas de cliente
│   │   │   └── crud*/                    # Páginas CRUD
│   │   ├── services/                     # Servicios Angular
│   │   │   ├── auth.service.ts           # Autenticación
│   │   │   ├── admin.service.ts          # Servicios admin
│   │   │   ├── empresa.service.ts        # Servicios empresa
│   │   │   └── cliente.service.ts        # Servicios cliente
│   │   ├── app.component.*               # Componente raíz
│   │   ├── app.config.ts                 # Configuración app
│   │   └── app.routes.ts                 # Rutas de navegación
│   ├── index.html                        # HTML principal
│   ├── main.ts                          # Bootstrap de Angular
│   └── styles.css                       # Estilos globales
├── angular.json                         # Configuración Angular
├── package.json                         # Dependencias npm
├── tsconfig.json                        # Configuración TypeScript
└── README.md
```

## 🔧 Scripts disponibles

```bash
ng serve          # Ejecuta la app en modo desarrollo (puerto 4200)
ng build          # Construye la app para producción
ng build --watch  # Construye con modo observación
ng test           # Ejecuta las pruebas unitarias
ng lint           # Ejecuta el linter de código
```

## 🔐 Sistema de Autenticación

### Flujo de autenticación:
1. **Login:** Usuario ingresa credenciales en `/login`
2. **JWT Token:** Backend devuelve access token y refresh token
3. **Interceptor:** Añade automáticamente Authorization header
4. **Guards:** Protegen rutas según rol del usuario
5. **Renovación:** Refresh automático de tokens expirados

### Protección de rutas:
```typescript
// Rutas protegidas por rol
{
  path: 'admin',
  canActivate: [loginGuard],
  data: { roles: ['ADMON'] }
}
```

## 🎨 Diseño y UX

### Paleta de colores:
- **Primario:** Azules corporativos (#007bff)
- **Secundario:** Grises modernos (#6c757d)
- **Éxito:** Verde (#28a745)
- **Peligro:** Rojo (#dc3545)

### Componentes UI:
- **Cards interactivas** con hover effects
- **Tablas responsivas** con paginación
- **Formularios validados** con feedback visual
- **Modales elegantes** para confirmaciones

### Responsive Design:
- 📱 **Mobile First:** Diseño optimizado para móviles
- 📟 **Tablet:** Adaptación para pantallas medianas
- 💻 **Desktop:** Experiencia completa de escritorio
- 🖥️ **Large Desktop:** Aprovechamiento de pantallas grandes

## 🚀 Deployment

La aplicación está desplegada junto con la API en:

### Configuración de producción:
- **Hosting:** Servidor VPS personalizado
- **SSL:** Certificado configurado
- **Dominio:** vacantes.adriancc.com
- **Build:** Optimizado para producción

### Para deploy local:
1. Ejecuta `ng build --configuration=production`
2. Los archivos se generan en `dist/`
3. Configura servidor web (Apache/Nginx)
4. Apunta a la carpeta `dist/`

## 🐛 Reportar problemas

Si encuentras algún bug o tienes sugerencias:

1. Verifica que no exista un issue similar
2. Crea un [nuevo issue](https://github.com/Kvr0th3c4t/VacantesFront/issues)
3. Incluye pasos para reproducir el problema
4. Especifica navegador y versión

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Adrián Carmona**
- Email: adrianc.crim@hotmail.com
- Frontend: [https://vacantes.adriancc.com/](https://vacantes.adriancc.com/)
- API: [https://api-vacantes.adriancc.com/](https://api-vacantes.adriancc.com/)

## 🙏 Agradecimientos

- [Angular Team](https://angular.io/) por el framework robusto
- [Bootstrap](https://getbootstrap.com/) por los componentes UI
- [SweetAlert2](https://sweetalert2.github.io/) por las notificaciones elegantes
- [FontAwesome](https://fontawesome.com/) por los iconos vectoriales
- [RxJS](https://rxjs.dev/) por la programación reactiva

## 📊 Estado del proyecto

![GitHub issues](https://img.shields.io/github/issues/Kvr0th3c4t/VacantesFront)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Kvr0th3c4t/VacantesFront)
![GitHub stars](https://img.shields.io/github/stars/Kvr0th3c4t/VacantesFront)
![GitHub forks](https://img.shields.io/github/forks/Kvr0th3c4t/VacantesFront)

---

⭐️ **¡No olvides darle una estrella al proyecto si te gustó!** ⭐️

> **Nota:** Este es un proyecto personal desarrollado con fines educativos y profesionales. Forma parte de un sistema completo de gestión de empleos junto con la API REST correspondiente.
