import { Component, inject } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ISolicitudes } from '../../interfaces/isolicitudes';
import { CardSolicitudesComponent } from '../../components/card-solicitudes/card-solicitudes.component';

@Component({
  selector: 'app-cliente-solicitudes',
  standalone: true,
  imports: [CardSolicitudesComponent],
  templateUrl: './cliente-solicitudes.component.html',
  styleUrl: './cliente-solicitudes.component.css',
})
export class ClienteSolicitudesComponent {
  private clienteService = inject(ClienteService);

  arrSolicitudes: ISolicitudes[];

  constructor() {
    this.arrSolicitudes = [];
  }
  ngOnInit() {
    this.loadSolicitudes();
  }
  loadSolicitudes() {
    this.clienteService.getSolicitudes().subscribe((data: ISolicitudes[]) => {
      this.arrSolicitudes = data;
    });
  }
}
