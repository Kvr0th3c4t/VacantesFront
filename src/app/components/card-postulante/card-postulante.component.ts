import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ISolicitudes } from '../../interfaces/isolicitudes';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../services/empresa.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-postulante',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-postulante.component.html',
  styleUrl: './card-postulante.component.css'
})
export class CardPostulanteComponent {

  @Input() solicitud!: ISolicitudes;
  @Output() onEliminar = new EventEmitter<void>();

empresaService = inject(EmpresaService);

  constructor() {
  }

  cancelarSolicitud(idSolicitud: string) {
    if (this.solicitud.estado !== false) {
      console.log(this.solicitud.estatus)
      Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción cancelará tu solicitud.",
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
        this.empresaService.denegarSolicitud(idSolicitud).subscribe(() => {
          Swal.fire({
            icon: "success",
            title: "Cancelada",
            text: "Has cancelado la solicitud.",
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-secondary",
            },
            buttonsStyling: false,
          });

          setTimeout(() => {
            this.onEliminar.emit();
            window.location.reload();
          }, 1000); 
        });
      }
    });
    } else {
      Swal.fire({

      text: "Esta solicitud ya esta CANCELADA.",
      icon: "warning",

    })
    }
  }

  aceptarSolicitud(idSolicitud: string) {
    if (this.solicitud.estado !== true) {
      console.log(this.solicitud.estatus)
      Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción aceptará la solicitud.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, aceptar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn btn-secondary",
        cancelButton: "btn btn-secondary ms-3",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaService.aceptarSolicitud(idSolicitud).subscribe(() => {
          Swal.fire({
            icon: "success",
            title: "Aceptada",
            text: "Has aceptado la solicitud.",
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-secondary",
            },
            buttonsStyling: false,
          });

          setTimeout(() => {
            this.onEliminar.emit();
            window.location.reload();
          }, 1000); 
        });
      }
    });
    } else {
      Swal.fire({
      text: "Esta solicitud ya esta ACEPTADA.",
      icon: "warning",
      customClass: {
        cancelButton: "btn btn-secondary ms-3",
      },
    })
    }
  }
}

