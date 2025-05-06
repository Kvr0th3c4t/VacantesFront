import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { IAltaEmpresa } from '../../interfaces/ialta-empresa';
import { AdminService } from '../../services/admin.service';
import { IAltaAdmin } from '../../interfaces/ialta-admin';

@Component({
  selector: 'app-admin-alta-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-alta-admin.component.html',
  styleUrl: './admin-alta-admin.component.css'
})
export class AdminAltaAdminComponent {
router = inject(Router);
  adminService = inject(AdminService);
  ActivatedRoute = inject(ActivatedRoute);

  @Input() empresa! : IAltaEmpresa;
  adminForm: FormGroup;

  constructor() {

    this.adminForm = new FormGroup({
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
    let empresa: IAltaAdmin = this.adminForm.value;
    console.log(this.adminForm.value);
    if (empresa) {
      const res = await firstValueFrom(
        this.adminService.altaEmpresa(empresa)
      );

      if (res) {

        Swal.fire({
          title: "Empresa creada!",
          text: `La empresa ${res.nombre} se ha creado correctamente.`,
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
      this.adminForm.get(formControlName)?.hasError(validador) &&
      this.adminForm.get(formControlName)?.touched
    );
  }

  goBack() {
    this.router.navigate(["/admin/home"]);
  }

}