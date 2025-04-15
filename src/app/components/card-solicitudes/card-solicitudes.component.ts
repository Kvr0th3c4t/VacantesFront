import { Component, Input } from '@angular/core';
import { ISolicitudes } from '../../interfaces/isolicitudes';

@Component({
  selector: 'app-card-solicitudes',
  standalone: true,
  imports: [],
  templateUrl: './card-solicitudes.component.html',
  styleUrl: './card-solicitudes.component.css',
})
export class CardSolicitudesComponent {
  eliminarSolicitud(arg0: string) {
    throw new Error('Method not implemented.');
  }
  @Input() solicitud!: ISolicitudes;
  @Input() idSolicitud!: string;
}
