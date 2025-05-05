import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IempresaTable } from '../../interfaces/iempresa-table';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-empresas-crudtable',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empresas-crudtable.component.html',
  styleUrl: './empresas-crudtable.component.css'
})
export class EmpresasCRUDTableComponent {
  @Input() empresa!: IempresaTable;
  @Output() onEliminar = new EventEmitter<void>();
  
  eliminando: boolean;
  
  constructor() {
			this.eliminando = false;
		}
  adminService = inject(AdminService);
  
  eliminarEmpresa(idEmpresa: string) {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará la empresa.",
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
            this.adminService.eliminarEmpresa(idEmpresa).subscribe(() => {
              Swal.fire({
                icon: "success",
                title: "Eliminada",
                text: "Tu solicitud ha sido eliminada.",
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
  
}
