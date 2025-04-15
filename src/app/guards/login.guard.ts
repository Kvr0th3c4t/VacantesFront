import { RoleOptions } from './../../../node_modules/@tufjs/models/dist/role.d';
import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accessToken = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user')!); // Asumiendo que el rol del usuario está almacenado en localStorage
  let userRole = user.rol || '';
  const expectedRoles: string[] = route.data?.['roles'] || [];

  if (!accessToken) {
    alert('No tienes permisos para acceder a esta ruta.');
    return router.navigate(['/login']); // Redirigir a la página de inicio de sesión si no hay token
  }

  // Si hay roles definidos en la ruta y el rol del usuario no coincide
  if (expectedRoles.length > 0 && !expectedRoles.includes(userRole || '')) {
    alert('No tienes permisos para acceder a esta ruta.');
    return router.navigate(['/login']);
  }

  return true; // Usuario autenticado y con rol válido
};

export const loginGuardChild: CanActivateChildFn = loginGuard;
