import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { ICardVacante } from '../../interfaces/icard-vacante';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { IVacanteModificar } from '../../interfaces/ivacante-modificar';
import { IVacanteDetalle } from '../../interfaces/ivacante-detalle';

@Component({
  selector: 'app-empresa-vacante-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empresa-vacante-form.component.html',
  styleUrl: './empresa-vacante-form.component.css'
})
export class EmpresaVacanteFormComponent {

  router = inject(Router);
  empresaService = inject(EmpresaService);
  ActivatedRoute = inject(ActivatedRoute);

  vacantesForm: FormGroup;

  @Input() vacante!: IVacanteDetalle;
  tipo: string;

  constructor() {
    this.tipo = "Insertar";
    this.vacantesForm = new FormGroup({
      salario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      estatus: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      detalles: new FormControl('', Validators.required),
      imagen: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        ),
      ]),
    },
      []);
  }

  ngOnInit(): void {

    this.ActivatedRoute.params.subscribe(async (params: any) => {
      if (params.idVacante) {
        this.tipo = "Modificar";
        const vacanteResponse: ICardVacante = await firstValueFrom(
          this.empresaService.getVacanteById(params.idVacante)

        );
        console.log("Vacante recibida:", vacanteResponse);

        this.vacantesForm = new FormGroup({
          idVacante: new FormControl(vacanteResponse.idVacante, []),
          salario: new FormControl(vacanteResponse.salario, [Validators.required]),
          nombre: new FormControl(vacanteResponse.nombre, [Validators.required]),
          estatus: new FormControl(vacanteResponse.estatus, Validators.required),
          descripcion: new FormControl(vacanteResponse.descripcion, Validators.required),
          detalles: new FormControl(vacanteResponse.detalles, Validators.required),
          imagen: new FormControl(vacanteResponse.imagen, [
            Validators.required,
            Validators.pattern(
              /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
            ),
          ]),
        }, []);
      }
    });
  }

  async getDataForm() {
    let vacante: IVacanteModificar = this.vacantesForm.value;
    console.log(this.vacantesForm.value);

    if (vacante.idVacante) {

      const res = await firstValueFrom(
        this.empresaService.modificarVacante(vacante.idVacante, vacante)
      );

      if (res.idVacante) {

        Swal.fire({
          title: "Vacante actualizada!",
          text: `La vacante ${res.nombre} se ha actualizado correctamente.`,
          icon: "success"
        });
        this.router.navigate(['/empresa/home']);
      } else {
        Swal.fire({
          title: "Vaya...parece que ha habido un problema",
          text: ` No se ha podido actualizar al usuario correctamente.`,
          icon: "error"
        });
      }
    } 
  }

  checkControl(
    formControlName: string,
    validador: string
  ): boolean | undefined {
    return (
      this.vacantesForm.get(formControlName)?.hasError(validador) &&
      this.vacantesForm.get(formControlName)?.touched
    );
  }

  goBack() {
    this.router.navigate(["/empresa/home"]);
  }

}

