import { Component, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ICardVacante } from '../../interfaces/icard-vacante';

@Component({
  selector: 'app-empresa-crear-vacante',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './empresa-crear-vacante.component.html',
  styleUrl: './empresa-crear-vacante.component.css'
})
export class EmpresaCrearVacanteComponent {
goBack() {
throw new Error('Method not implemented.');
}
  empresaService = inject(EmpresaService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  formVacante!: FormGroup;
  loading: boolean;

  constructor() {
    this.loading = false;
    this.formVacante = new FormGroup({
      salario: new FormControl('', [Validators.required]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        ),
      ]),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}([a-zA-Z0-9-]*)$/)
      ]),
    },

      []);

  }

  getDataForm() {
		this.router.navigate(["/home/empresa"]);
    }

  checkControl(
    formControlName: string,
    validador: string
  ): boolean | undefined {
    return (
      this.formVacante.get(formControlName)?.hasError(validador) &&
      this.formVacante.get(formControlName)?.touched
    );
  }
}

