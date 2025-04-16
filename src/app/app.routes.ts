import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { loginGuard } from './guards/login.guard';
import { ClienteSolicitudesComponent } from './pages/cliente-solicitudes/cliente-solicitudes.component';
import { ClienteSolicitarVacanteComponent } from './pages/cliente-solicitar-vacante/cliente-solicitar-vacante.component';
import { NotFoundComponent } from './pages/not-found-page/not-found-page.component';
import { RegistroComponent } from './pages/registro/registro.component';

export const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
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
    ],
  },
  { path: '**', component: NotFoundComponent },
];
