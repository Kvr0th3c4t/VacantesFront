import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import Swal from 'sweetalert2';
import { IEmpresaModificar } from '../../interfaces/iempresa-modificar';

@Component({
  selector: 'app-empresa-edit-perfil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empresa-edit-perfil.component.html',
  styleUrl: './empresa-edit-perfil.component.css'
})
export class EmpresaEditPerfilComponent {
  router = inject(Router);
  empresaService = inject(EmpresaService);
  ActivatedRoute = inject(ActivatedRoute);

  empresaForm!: FormGroup;

  @Input() empresa!: IEmpresaModificar;

  constructor() {
    this.empresaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      direccionFiscal: new FormControl('', [Validators.required]),
      pais: new FormControl('', Validators.required),
    },
      []);
  }

  ngOnInit(): void {

 //obtienelos datos de la empresa al inicializar el componente
 this.empresaService.getPerfilEmpresa().subscribe(
  (empresaData) => {
    //coge datos de la empresa y los muestra en el form
    this.empresa = empresaData;
    this.empresaForm.patchValue({
      nombre: this.empresa.nombre,
      direccionFiscal: this.empresa.direccionFiscal,
      pais: this.empresa.pais,
    });
  },
  (error) => {
    Swal.fire({
      title: 'Error',
      text: 'No se pudo obtener los datos del perfil.',
      icon: 'error',
    });
  }
);
}

//envia form
getDataForm() {
  const empresa: IEmpresaModificar = this.empresaForm.value;
  
  this.empresaService.modificarEmpresa(empresa).subscribe({
    next: (res) => {
      Swal.fire({
        title: 'Empresa actualizada!',
        text: `La empresa se ha actualizado correctamente.`,
        icon: 'success',
      });
      this.router.navigate(['/empresa/home']);
    },
    error: (err) => {
      console.error('Error al actualizar:', err);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar la empresa.',
        icon: 'error',
      });
    }
  });
}

checkControl(formControlName: string, validador: string): boolean | undefined {
return (
  this.empresaForm.get(formControlName)?.hasError(validador) &&
  this.empresaForm.get(formControlName)?.touched
);
}

goBack() {
this.router.navigate(['/empresa/home']);
}
}

