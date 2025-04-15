import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IUser } from '../../interfaces/iuser';

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
    this.user = JSON.parse(localStorage.getItem('user')!); // Asumiendo que el rol del usuario está almacenado en localStorage
    this.userRole = this.user.rol || '';
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
