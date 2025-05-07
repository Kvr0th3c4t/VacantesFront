import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { IUsuarioDetalle } from '../../interfaces/iusuario-detalle';
import { AdminService } from '../../services/admin.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios-crudtable',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usuarios-crudtable.component.html',
  styleUrl: './usuarios-crudtable.component.css'
})
export class UsuariosCRUDTableComponent {
  @Input() usuario!: IUsuarioDetalle;
  @Output() onEliminar = new EventEmitter<void>();
  
  eliminando: boolean;
  avatarUrl: string;
  userRole: string;
  user: IUsuarioDetalle;
        
  constructor() {
    this.eliminando = false;
    this.avatarUrl = '';
    this.user = JSON.parse(localStorage.getItem("user")!); 
    this.userRole = this.user.rol || "";
    }
  adminService = inject(AdminService)
  
  ngOnInit(): void {
    this.generarAvatarAleatorio()
    
  }

  eliminarUsuario(email: string) {
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
            this.adminService.eliminarUsuario(email).subscribe(() => {
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
  generarAvatarAleatorio(): void {
    const numeroAleatorio = Math.floor(Math.random() * 6) + 1;
    
    this.avatarUrl = `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${numeroAleatorio}.webp`;
  }
}
