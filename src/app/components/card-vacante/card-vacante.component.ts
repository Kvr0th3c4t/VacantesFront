import { Component, Input } from '@angular/core';
import { ICardVacante } from '../../interfaces/icard-vacante';

@Component({
  selector: 'app-card-vacante',
  standalone: true,
  imports: [],
  templateUrl: './card-vacante.component.html',
  styleUrl: './card-vacante.component.css',
})
export class CardVacanteComponent {
  @Input() vacante!: ICardVacante; // Define el tipo de vacante según tu modelo
}
