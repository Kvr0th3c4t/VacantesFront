import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IempresaTable } from '../../interfaces/iempresa-table';
import { IUsuarioDetalle } from '../../interfaces/iusuario-detalle';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crudempresas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './crudempresas.component.html',
  styleUrl: './crudempresas.component.css'
})
export class CRUDEmpresasComponent {
  @Input() usuario!: IUsuarioDetalle;
  @Output() onEliminar = new EventEmitter<void>();
    
  eliminando: boolean;
  avatarUrl: string;
  userRole: string;
  user: IUsuarioDetalle;
  private adminService = inject(AdminService);
    
  arrEmpresas: IempresaTable[];
      
  cargando: boolean = true; // Variable para controlar el estado de carga
    
  constructor() {
    this.arrEmpresas = [];
    this.eliminando = false;
    this.avatarUrl = '';
    this.user = JSON.parse(localStorage.getItem("user")!);
    this.userRole = this.user.rol || "";
  }
  
  ngOnInit() {

    this.loadEmpresas();
    this.generarAvatarAleatorio()

  }

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

  generarAvatarAleatorio(): void {
    const numeroAleatorio = Math.floor(Math.random() * 6) + 1;
    
    this.avatarUrl = `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${numeroAleatorio}.webp`;
  }
    //Empresa
    loadEmpresas() {
      this.adminService.getAllEmpresasTable().subscribe((data: IempresaTable[]) => {
        this.arrEmpresas = data;
        this.cargando = false;
      })
    }
}

