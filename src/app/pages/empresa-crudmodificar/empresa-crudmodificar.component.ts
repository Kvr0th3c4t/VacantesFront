import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Iempresa } from '../../interfaces/iempresa';
import { AdminService } from '../../services/admin.service';
import { IEmpresaModificar } from '../../interfaces/iempresa-modificar';

@Component({
  selector: 'app-empresa-crudmodificar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empresa-crudmodificar.component.html',
  styleUrl: './empresa-crudmodificar.component.css'
})
export class EmpresaCRUDModificarComponent {

  router = inject(Router);
  adminService = inject(AdminService);
  ActivatedRoute = inject(ActivatedRoute);
  
  empresaForm: FormGroup;
  
  constructor() {
    this.empresaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      direccionFiscal: new FormControl('', Validators.required),
      pais: new FormControl('', Validators.required),
    },
      []);
  }
  @Input() empresa!: Iempresa;

ngOnInit(): void {

    this.ActivatedRoute.params.subscribe(async (params: any) => {
      if (params.idEmpresa) {
        const empresaResponse: IEmpresaModificar = await firstValueFrom(
          this.adminService.getEmpresaById(params.idEmpresa)

        );
        console.log("Vacante recibida:", empresaResponse);

        this.empresaForm = new FormGroup({
          idEmpresa: new FormControl(empresaResponse.idEmpresa, []),
          nombre: new FormControl(empresaResponse.nombre, [Validators.required]),
          direccionFiscal: new FormControl(empresaResponse.direccionFiscal, Validators.required),
          pais: new FormControl(empresaResponse.pais, Validators.required),

        }, []);
      }
    });
  }

  async getDataForm() {
    let empresa: IEmpresaModificar = this.empresaForm.value;
    console.log(this.empresaForm.value);

    if (empresa.idEmpresa) {

      const res = await firstValueFrom(
        this.adminService.modificarEmpresa(empresa.idEmpresa, empresa)
      );

      if (res.idEmpresa) {

        Swal.fire({
          title: "Empresa actualizada!",
          text: `La Empresa ${empresa.nombre} se ha actualizado correctamente.`,
          icon: "success"
        });
        this.router.navigate(['/admin/home']);
      } else {
        Swal.fire({
          title: "Vaya...parece que ha habido un problema",
          text: ` No se ha podido actualizar la empresa correctamente.`,
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
    this.router.navigate(["/admin/CRUDEmpresas"]);
  }

}
