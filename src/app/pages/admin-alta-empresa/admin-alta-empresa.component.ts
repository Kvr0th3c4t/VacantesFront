import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';
import { IAltaEmpresa } from '../../interfaces/ialta-empresa';

@Component({
  selector: 'app-admin-alta-empresa',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-alta-empresa.component.html',
  styleUrl: './admin-alta-empresa.component.css'
})
export class AdminAltaEmpresaComponent {
  router = inject(Router);
  adminService = inject(AdminService);
  ActivatedRoute = inject(ActivatedRoute);

  @Input() empresa! : IAltaEmpresa;
  empresaForm: FormGroup;

  constructor() {

    this.empresaForm = new FormGroup({
      nombreEmpresa: new FormControl('', [Validators.required]),
      cif: new FormControl('', [Validators.required]),
      direccionFiscal: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      nombreUsuario: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
    },
      []);
  }


  async getDataForm() {
    let empresa: IAltaEmpresa = this.empresaForm.value;
    console.log(this.empresaForm.value);
    if (empresa) {
      const res = await firstValueFrom(
        this.adminService.altaEmpresa(empresa)
      );

      if (res) {

        Swal.fire({
          title: "Empresa creada!",
          text: `La empresa ${empresa.nombreEmpresa} se ha creado correctamente.`,
          icon: "success"
        });
        this.router.navigate(['/admin/home']);
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
      this.empresaForm.get(formControlName)?.hasError(validador) &&
      this.empresaForm.get(formControlName)?.touched
    );
  }

  goBack() {
    this.router.navigate(["/admin/home"]);
  }

}