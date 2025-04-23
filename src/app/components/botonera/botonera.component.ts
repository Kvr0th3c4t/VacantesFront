import { Component, Input, input } from '@angular/core';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-botonera',
  standalone: true,
  imports: [],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {
  user: IUser;
  cargando: boolean = true; // Variable para controlar el estado de carga
  userRole: string;
  @Input() parent: string;
  @Input() id: string;


  constructor() {
    this.user = JSON.parse(localStorage.getItem("user")!); // Asumiendo que el rol del usuario está almacenado en localStorage
    this.userRole = this.user.rol || "";
    this.parent = "";
    this.id = "";
  }
}
