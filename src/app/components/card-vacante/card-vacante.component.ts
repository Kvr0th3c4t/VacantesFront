import { Component, Input } from "@angular/core";
import { ICardVacante } from "../../interfaces/icard-vacante";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-card-vacante",
	standalone: true,
	imports: [RouterLink],
	templateUrl: "./card-vacante.component.html",
	styleUrl: "./card-vacante.component.css",
})
export class CardVacanteComponent {
	@Input() vacante!: ICardVacante;
	@Input() idVacante!: string; // Define el tipo de vacante según tu modelo
}
