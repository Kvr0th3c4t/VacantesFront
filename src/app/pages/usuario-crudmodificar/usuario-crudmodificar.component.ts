import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-usuario-crudmodificar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-crudmodificar.component.html',
  styleUrl: './usuario-crudmodificar.component.css'
})
  
export class UsuarioCRUDModificarComponent {

  router = inject(Router);
  adminService = inject(AdminService);
  ActivatedRoute = inject(ActivatedRoute);
  
  usuarioForm: FormGroup;
  
  constructor() {
    this.usuarioForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rol: new FormControl('', Validators.required),
    },
      []);
  }

  @Input() usuario!: IUser;

ngOnInit(): void {

    this.ActivatedRoute.params.subscribe(async (params: any) => {
      if (params.email) {
        const usuarioResponse: IUser = await firstValueFrom(
          this.adminService.getUsuarioById(params.email)

        );
        console.log("Usuario recibido:", usuarioResponse);

        this.usuarioForm = new FormGroup({
          email: new FormControl(usuarioResponse.email, []),
          nombre: new FormControl(usuarioResponse.nombre, [Validators.required]),
          apellidos: new FormControl(usuarioResponse.apellidos, Validators.required),
          rol: new FormControl(usuarioResponse.rol, Validators.required),
          password: new FormControl(usuarioResponse.password, Validators.required),

        }, []);
      }
    });
  }

  async getDataForm() {
    let usuario: IUser = this.usuarioForm.value;
    console.log(this.usuarioForm.value);

    if (usuario.email) {

      const res = await firstValueFrom(
        this.adminService.modificarUsuario(usuario.email, usuario)
      );

      if (res.email) {

        Swal.fire({
          title: "Usuario actualizado!",
          text: `El usuario ${res.nombre} se ha actualizado correctamente.`,
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
      this.usuarioForm.get(formControlName)?.hasError(validador) &&
      this.usuarioForm.get(formControlName)?.touched
    );
  }

  goBack() {
    this.router.navigate(["/admin/CRUDUsuarios"]);
  }

}
