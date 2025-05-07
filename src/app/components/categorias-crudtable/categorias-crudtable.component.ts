import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';
import { ICategoria } from '../../interfaces/icategoria';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorias-crudtable',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categorias-crudtable.component.html',
  styleUrl: './categorias-crudtable.component.css'
})
export class CategoriasCRUDTableComponent {
  @Input() categoria!: ICategoria;
  @Output() onEliminar = new EventEmitter<void>();
  
  eliminando: boolean;
  iconoCategorias: string[];
  iconoAleatorio: string;

  constructor() {
    this.eliminando = false;
    this.iconoCategorias = [
      'bi bi-pc-display fs-3',
      'bi bi-phone fs-3',
      'bi bi-camera fs-3',
      'bi bi-headphones fs-3',
      'bi bi-controller fs-3',
      'bi bi-laptop fs-3',
      'bi bi-printer fs-3',
      'bi bi-router fs-3',
      'bi bi-watch fs-3',
      'bi bi-speaker fs-3',
      'bi bi-tv fs-3',
      'bi bi-tablet fs-3',
      'bi bi-keyboard fs-3',
      'bi bi-mouse fs-3',
      'bi bi-cpu fs-3'
    ];
    this.iconoAleatorio = this.obtenerIconoAleatorio()

    }
  adminService = inject(AdminService);
  
  eliminarCategoria(idCategoria: string) {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará la categoria.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
          customClass: {
            confirmButton: "btn btn-secondary",
            cancelButton: "btn btn-secondary ms-3",
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.adminService.eliminarCategoria(idCategoria).subscribe(() => {
              Swal.fire({
                icon: "success",
                title: "Eliminada",
                text: "Tu categoria ha sido eliminada.",
                confirmButtonText: "Aceptar",
                customClass: {
                  confirmButton: "btn btn-secondary",
                },
                buttonsStyling: false,
              });
    
              this.eliminando = true;
    
              // Esperamos a que termine la animación antes de avisar al padre
              setTimeout(() => {
                this.onEliminar.emit();
                window.location.reload();
              }, 300); // duración igual a la del CSS
            });
          }
        });
      }
  obtenerIconoAleatorio(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.iconoCategorias.length);
    return this.iconoCategorias[indiceAleatorio];
  }
}

