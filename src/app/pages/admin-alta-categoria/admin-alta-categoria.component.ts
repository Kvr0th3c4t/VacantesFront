import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-alta-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-alta-categoria.component.html',
  styleUrl: './admin-alta-categoria.component.css'
})
export class AdminAltaCategoriaComponent {
  router = inject(Router);
  adminService = inject(AdminService);

  categoriaForm: FormGroup;

  constructor() {
    this.categoriaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      descripcion: new FormControl('', [Validators.maxLength(100)])
    });
  }

  async getDataForm() {
    const categoria = this.categoriaForm.value;
    if (this.categoriaForm.valid) {
      try {
        const res = await firstValueFrom(this.adminService.altaCategoria(categoria));

        Swal.fire({
          title: '¡Categoría creada!',
          text: `La categoría ${categoria.nombre} se ha creado correctamente.`,
          icon: 'success'
        });
        this.router.navigate(['/admin/home']);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la categoría.',
          icon: 'error'
        });
        console.error(error);
      }
    }
  }

  checkControl(controlName: string, validator: string): boolean | undefined {
    return (
      this.categoriaForm.get(controlName)?.hasError(validator) &&
      this.categoriaForm.get(controlName)?.touched
    );
  }

  goBack() {
    this.router.navigate(['/admin/home']);
  }
}

