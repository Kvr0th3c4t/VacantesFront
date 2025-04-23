import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { IVacanteAlta } from '../../interfaces/ivacante-alta';
import { ICategoria } from '../../interfaces/icategoria';

@Component({
  selector: 'app-empresa-vacante-form-alta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empresa-vacante-form-alta.component.html',
  styleUrl: './empresa-vacante-form-alta.component.css'
})
export class EmpresaVacanteFormAltaComponent {
  router = inject(Router);
  empresaService = inject(EmpresaService);
  ActivatedRoute = inject(ActivatedRoute);

  @Input() vacante! : IVacanteAlta;
  vacantesForm: FormGroup;

  categorias: ICategoria[] = [];

  constructor() {
    this.vacantesForm = new FormGroup({
      salario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', Validators.required),
      detalles: new FormControl('', Validators.required),
      idCategoria: new FormControl('', Validators.required),
      imagen: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        ),
      ]),
    },
      []);
  }

  async cargarCategorias() {
       try {
         this.categorias = await firstValueFrom(this.empresaService.getAllCategorias());
       } catch (error) {
         console.error('Error al cargar las categorías:', error);
        Swal.fire('Error', 'No se pudieron cargar las categorías', 'error');
       }
     }

  ngOnInit(): void {
    this.cargarCategorias();
    }

  async getDataForm() {
    let vacante: IVacanteAlta = this.vacantesForm.value;
    console.log(this.vacantesForm.value);
    if (vacante) {
      const res = await firstValueFrom(
        this.empresaService.insertVacante(vacante)
      );

      if (res) {

        Swal.fire({
          title: "Vacante creada!",
          text: `La vacante ${res.nombre} se ha creado correctamente.`,
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
