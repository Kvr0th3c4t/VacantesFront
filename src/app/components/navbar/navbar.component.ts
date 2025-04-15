import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  router = inject(Router);
  userRole: string;
  user: IUser;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.userRole = this.user.rol || '';
  }

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cerrar sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-secondary',
        cancelButton: 'btn btn-outline-secondary ms-2',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }
}
