import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UsuariosCRUDTableComponent } from "../../components/usuarios-crudtable/usuarios-crudtable.component";
import { IUsuarioDetalle } from '../../interfaces/iusuario-detalle';

@Component({
  selector: 'app-admin-crudadmin',
  standalone: true,
  imports: [UsuariosCRUDTableComponent],
  templateUrl: './admin-crudadmin.component.html',
  styleUrl: './admin-crudadmin.component.css'
})
export class AdminCRUDADMINComponent {

  private AdminService = inject(AdminService);
    
      
      arrUsuarios: IUsuarioDetalle[] = [];
      
      cargando: boolean = true;

  constructor() { }
  
      ngOnInit() {

        this.loadUsuarios();

      }

      //Empresa
      loadUsuarios() {
        this.AdminService.getAdministradores().subscribe((data:IUsuarioDetalle[]) => {
          this.arrUsuarios = data;
          this.cargando = false;	
        console.log(this.arrUsuarios)
          
        })
      }
}
