import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';
import { ICategoria } from '../../interfaces/icategoria';

@Component({
  selector: 'app-categorias-crudmodificar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './categorias-crudmodificar.component.html',
  styleUrl: './categorias-crudmodificar.component.css'
})
export class CategoriasCRUDModificarComponent {

  router = inject(Router);
  adminService = inject(AdminService);
  ActivatedRoute = inject(ActivatedRoute);
  
  categoriaForm: FormGroup;
  
  constructor() {
    this.categoriaForm = new FormGroup({
      idCategoria: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', Validators.required),
    },
      []);
  }

  @Input() categoria!: ICategoria;

ngOnInit(): void {

    this.ActivatedRoute.params.subscribe(async (params: any) => {
      if (params.idCategoria) {
        const categoriaResponse: ICategoria = await firstValueFrom(
          this.adminService.getCategoriaById(params.idCategoria)

        );
        console.log("categoria recibido:", categoriaResponse);

        this.categoriaForm = new FormGroup({
          idCategoria: new FormControl(categoriaResponse.idCategoria, []),
          nombre: new FormControl(categoriaResponse.nombre, [Validators.required]),
          descripcion: new FormControl(categoriaResponse.descripcion, Validators.required),
        }, []);
      }
    });
  }

  async getDataForm() {
    let categoria: ICategoria = this.categoriaForm.value;
    console.log(this.categoriaForm.value);

    if (categoria.idCategoria) {

      const res = await firstValueFrom(
        this.adminService.modificarCategoria(categoria.idCategoria, categoria)
      );

      if (res.idCategoria) {

        Swal.fire({
          title: "Categoria actualizada!",
          text: `La categoria ${res.nombre} se ha actualizado correctamente.`,
          icon: "success"
        });
        this.router.navigate(['/admin/home']);
      } else {
        Swal.fire({
          title: "Vaya...parece que ha habido un problema",
          text: ` No se ha podido actualizar la categoria correctamente.`,
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
      this.categoriaForm.get(formControlName)?.hasError(validador) &&
      this.categoriaForm.get(formControlName)?.touched
    );
  }

  goBack() {
    this.router.navigate(["/admin/CRUDCategorias"]);
  }

}
