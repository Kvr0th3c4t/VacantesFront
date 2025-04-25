import { Component, inject, signal } from '@angular/core';
import { ISolicitudes } from '../../interfaces/isolicitudes';
import { CardSolicitudesComponent } from "../../components/card-solicitudes/card-solicitudes.component";
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresa-solicitudes',
  standalone: true,
  imports: [CardSolicitudesComponent],
  templateUrl: './empresa-solicitudes.component.html',
  styleUrl: './empresa-solicitudes.component.css'
})
export class EmpresaSolicitudesComponent {
private empresaService = inject(EmpresaService);

  solicitudes = signal<ISolicitudes[]>([]);
  cargando = signal(true);

  ngOnInit() {
    this.loadSolicitudes();
  }

  loadSolicitudes() {
    this.cargando = signal(true);
    this.empresaService.getSolicitudes().subscribe((data) => {
      this.solicitudes.set(data);
      this.cargando.set(false);
    });
  }
}
