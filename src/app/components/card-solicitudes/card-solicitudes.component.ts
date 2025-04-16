import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ISolicitudes } from '../../interfaces/isolicitudes';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-solicitudes.component.html',
  styleUrl: './card-solicitudes.component.css',
})
export class CardSolicitudesComponent {
  @Input() solicitud!: ISolicitudes;
  @Output() onEliminar = new EventEmitter<void>();

  clienteService = inject(ClienteService);
  eliminando: boolean;

  constructor() {
    this.eliminando = false;
  }
  eliminarSolicitud(idSolicitud: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará tu solicitud.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-secondary',
        cancelButton: 'btn btn-secondary ms-3',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteSolicitud(idSolicitud).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Eliminada',
            text: 'Tu solicitud ha sido eliminada.',
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn btn-secondary',
            },
            buttonsStyling: false,
          });

          this.eliminando = true;

          // Esperamos a que termine la animación antes de avisar al padre
          setTimeout(() => {
            this.onEliminar.emit();
          }, 300); // duración igual a la del CSS
        });
      }
    });
  }
}
