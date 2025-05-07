import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';
import { IAltaAdmin } from '../../interfaces/ialta-admin';
import { IUser } from '../../interfaces/iuser';

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

  @Input() admin! : IAltaAdmin[];
  adminForm: FormGroup;

  constructor() {

    this.adminForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', Validators.required),
    },
      []);
  }


  async getDataForm() {
    let admin: IUser = this.adminForm.value;
    console.log(this.adminForm.value);
    if (admin) {
      const res = await firstValueFrom(
        this.adminService.altaAdmin(admin)
      );

      if (res) {

        Swal.fire({
          title: "¡Usuario creado!",
          text: `El usuario ${admin.nombre} se ha creado correctamente.`,
          icon: "success"
        });
        this.router.navigate(['/admin/home']);
      } else {
        Swal.fire({
          title: "Vaya...parece que ha habido un problema",
          text: ` No se ha podido crear al usuario correctamente.`,
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