import { Component, inject } from '@angular/core';
import { ICardVacante } from '../../interfaces/icard-vacante';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-solicitar-vacante',
  standalone: true,
  imports: [],
  templateUrl: './cliente-solicitar-vacante.component.html',
  styleUrl: './cliente-solicitar-vacante.component.css',
})
export class ClienteSolicitarVacanteComponent {
  vacante: ICardVacante;
  usuarioService = inject(ClienteService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    this.vacante = {} as ICardVacante;
  }
  ngOnInit() {
    this.loadVacante();
  }
  loadVacante() {
    this.activatedRoute.params.subscribe((params: any) => {
      const id: string = params.idVacante;
      console.log(id);
      this.usuarioService.getById(id).subscribe((data: ICardVacante) => {
        this.vacante = data;
      });
    });
  }

  goBack() {
    this.router.navigate(['/usuario/home']);
  }
}
