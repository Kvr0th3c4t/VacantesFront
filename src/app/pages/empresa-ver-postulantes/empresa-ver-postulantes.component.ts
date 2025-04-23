import { Component, inject } from '@angular/core';
import { CardPostulanteComponent } from "../../components/card-postulante/card-postulante.component";
import { ISolicitudes } from '../../interfaces/isolicitudes';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresa-ver-postulantes',
  standalone: true,
  imports: [CardPostulanteComponent],
  templateUrl: './empresa-ver-postulantes.component.html',
  styleUrl: './empresa-ver-postulantes.component.css'
})
export class EmpresaVerPostulantesComponent {

  idVacante!: number;
  solicitudes: any[] = [];
  router = inject(Router);
  route = inject(ActivatedRoute);
  empresaService = inject(EmpresaService);
  constructor() {}

  ngOnInit(): void {
    this.idVacante = +this.route.snapshot.paramMap.get('id')!;
    this.empresaService.getSolicitudesPorVacante(this.idVacante).subscribe({
      next: res => this.solicitudes = res,
      error: err => console.error('Error al obtener solicitudes:', err)
    });
  }

  goBack() {
		this.router.navigate(["/empresa/home"]);
	}

}
