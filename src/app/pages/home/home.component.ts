import { Component, inject } from '@angular/core';
import { CardVacanteComponent } from '../../components/card-vacante/card-vacante.component';
import { ICardVacante } from '../../interfaces/icard-vacante';
import { ClienteService } from '../../services/cliente.service';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardVacanteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private clienteService = inject(ClienteService);
  arrVacantes: ICardVacante[];
  userRole: string;
  user: IUser;

  constructor() {
    this.arrVacantes = [];
    this.user = JSON.parse(localStorage.getItem('user')!); // Asumiendo que el rol del usuario está almacenado en localStorage
    this.userRole = this.user.rol || '';
  }
  ngOnInit() {
    this.loadVacantes();
  }
  loadVacantes() {
    this.clienteService.getAll().subscribe((data: ICardVacante[]) => {
      this.arrVacantes = data;
    });
  }
}
