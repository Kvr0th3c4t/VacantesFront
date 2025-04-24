import { Component, inject, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { IVacanteDetalle } from '../../interfaces/ivacante-detalle';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ISolicitudes } from '../../interfaces/isolicitudes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresa-detalle-vacante',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './empresa-detalle-vacante.component.html',
  styleUrl: './empresa-detalle-vacante.component.css'
})
export class EmpresaDetalleVacanteComponent implements OnInit {
  miVacante!: IVacanteDetalle;
  empresaService = inject(EmpresaService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  arrSolicitudes: ISolicitudes [] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idVacante = params['idVacante'];
      this.empresaService.verDetalleVacante(idVacante).subscribe((vacante: IVacanteDetalle) => {
        this.miVacante = vacante;
      });

      this.empresaService.getSolicitudesPorVacante(idVacante).subscribe((solicitudes: ISolicitudes[]) => {
        console.log("Solicitudes recibidas:", solicitudes);

        this.arrSolicitudes = solicitudes;
      });

    });
  }

goBack() {
  this.router.navigate(["/empresa/home"]);
}

}
