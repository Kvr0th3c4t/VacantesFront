import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { loginGuard } from './guards/login.guard';
import { ClienteSolicitudesComponent } from './pages/cliente-solicitudes/cliente-solicitudes.component';
import { ClienteSolicitarVacanteComponent } from './pages/cliente-solicitar-vacante/cliente-solicitar-vacante.component';
import { NotFoundComponent } from './pages/not-found-page/not-found-page.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { EmpresaSolicitudesComponent } from './pages/empresa-solicitudes/empresa-solicitudes.component';
import { EmpresaCrearVacanteComponent } from './pages/empresa-crear-vacante/empresa-crear-vacante.component';
import { EmpresaDetalleVacanteComponent } from './pages/empresa-detalle-vacante/empresa-detalle-vacante.component';
import { EmpresaVerPostulantesComponent } from './pages/empresa-ver-postulantes/empresa-ver-postulantes.component';
import { EmpresaVacanteFormComponent } from './pages/empresa-vacante-form/empresa-vacante-form.component';
import { EmpresaVacanteFormAltaComponent } from './pages/empresa-vacante-form-alta/empresa-vacante-form-alta.component';
import { EmpresaEditPerfilComponent } from './pages/empresa-edit-perfil/empresa-edit-perfil.component';
import { CRUDEmpresasComponent } from './pages/crudempresas/crudempresas.component';
import { CRUDUsuariosComponent } from './pages/crudusuarios/crudusuarios.component';
import { CRUDCategoriasComponent } from './pages/crudcategorias/crudcategorias.component';
import { EmpresaCRUDModificarComponent } from './pages/empresa-crudmodificar/empresa-crudmodificar.component';
import { UsuarioCRUDModificarComponent } from './pages/usuario-crudmodificar/usuario-crudmodificar.component';
import { CategoriasCRUDModificarComponent } from './pages/categorias-crudmodificar/categorias-crudmodificar.component';
import { AdminAltaEmpresaComponent } from './pages/admin-alta-empresa/admin-alta-empresa.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AdminAltaCategoriaComponent } from './pages/admin-alta-categoria/admin-alta-categoria.component';
import { AdminCRUDADMINComponent } from './pages/admin-crudadmin/admin-crudadmin.component';
import { AdminAltaAdminComponent } from './pages/admin-alta-admin/admin-alta-admin.component';

export const routes: Routes = [
  { path: 'landing', pathMatch: 'full', component: LandingPageComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup', component: RegistroComponent },
  {
    path: 'usuario',
    canActivate: [loginGuard], // Protege la ruta padre
    data: { roles: ['CLIENTE'] }, // Roles aplicados a todas las rutas hijas
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home', // Redirige a /usuario/home si acceden a /usuario
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['CLIENTE'] },
      },
      {
        path: 'solicitudes',
        component: ClienteSolicitudesComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['CLIENTE'] },
      },
      {
        path: 'solicitar/:idVacante',
        component: ClienteSolicitarVacanteComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['CLIENTE'] },
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [loginGuard], // Protege la ruta padre
    data: { roles: ['ADMON'] }, // Roles aplicados a todas las rutas hijas
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home', // Redirige a /usuario/home si acceden a /usuario
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['ADMON'] },
      },
      {
        path: 'CRUDEmpresas',
        component: CRUDEmpresasComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['ADMON'] },
      },
      {
        path: 'CRUDUsuarios',
        component: CRUDUsuariosComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['ADMON'] },
      },
      {
        path: 'CRUDCategorias',
        component: CRUDCategoriasComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['ADMON'] },
      },
      {
        path: 'EmpresaCRUDModificar/:idEmpresa',
        component: EmpresaCRUDModificarComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['ADMON'] },
      },
      {
        path: 'UsuarioCRUDModificar/:email',
        component: UsuarioCRUDModificarComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['ADMON'] },
      },
      {
        path: 'CategoriaCRUDModificar/:idCategoria',
        component: CategoriasCRUDModificarComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['ADMON'] },
      },
      {
        path: 'altaEmpresasForm',
        component: AdminAltaEmpresaComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['ADMON'] },
      },
      {
        path: 'altaCategoria',
        component: AdminAltaCategoriaComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['ADMON'] },
      },
      {
        path: 'verAdmins',
        component: AdminCRUDADMINComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['ADMON'] },
      },
      {
        path: 'altaUsuario',
        component: AdminAltaAdminComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['ADMON'] },
      }
    ],
  },
  {
    path: 'empresa',
    canActivate: [loginGuard], // Protege la ruta padre
    data: { roles: ['EMPRESA'] }, // Roles aplicados a todas las rutas hijas
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home', // Redirige a /usuario/home si acceden a /usuario
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['EMPRESA'] },
      },
      {
        path: 'solicitudes',
        component: EmpresaSolicitudesComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['EMPRESA'] },
      },
      {
        path: 'crearVacante',
        component: EmpresaCrearVacanteComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['EMPRESA'] },
      },
      {
        path: 'detalleVacante/:idVacante',
        component: EmpresaDetalleVacanteComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['EMPRESA'] },
      },
      {
        path: 'vacante/:id/solicitudes',
        component: EmpresaVerPostulantesComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['EMPRESA'] },
      },
      {
        path: 'nuevaVacante',
        component: EmpresaVacanteFormAltaComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['EMPRESA'] },
      },
      {
        path: 'updateVacante/:idVacante',
        component: EmpresaVacanteFormComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['EMPRESA'] },
      },
      {
        path: 'editarPerfil',
        component: EmpresaEditPerfilComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['EMPRESA'] },
      },
    ],
  },
  { path: '**', redirectTo: '/landing' },
];