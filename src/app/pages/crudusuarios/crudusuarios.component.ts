import { Component, inject } from '@angular/core';
import { UsuariosCRUDTableComponent } from "../../components/usuarios-crudtable/usuarios-crudtable.component";
import { ClienteService } from '../../services/cliente.service';
import { IUsuarioDetalle } from '../../interfaces/iusuario-detalle';

@Component({
  selector: 'app-crudusuarios',
  standalone: true,
  imports: [UsuariosCRUDTableComponent],
  templateUrl: './crudusuarios.component.html',
  styleUrl: './crudusuarios.component.css'
})
export class CRUDUsuariosComponent {
    
      private clienteService = inject(ClienteService);
    
      
      arrUsuarios: IUsuarioDetalle[];
      
      cargando: boolean = true;

      constructor() {
        this.arrUsuarios = [];
        
      }
      ngOnInit() {

        this.loadUsuarios();

      }

      //Empresa
      loadUsuarios() {
        this.clienteService.getAllUsuarios().subscribe((data:IUsuarioDetalle[]) => {
          this.arrUsuarios = data;
          this.cargando = false;	
        console.log(this.arrUsuarios)
          
        })
      }
}
