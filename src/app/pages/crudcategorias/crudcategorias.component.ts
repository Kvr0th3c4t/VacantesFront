import { Component, inject } from '@angular/core';
import { CategoriasCRUDTableComponent } from "../../components/categorias-crudtable/categorias-crudtable.component";
import { IempresaTable } from '../../interfaces/iempresa-table';
import { AdminService } from '../../services/admin.service';
import { ICategoria } from '../../interfaces/icategoria';

@Component({
  selector: 'app-crudcategorias',
  standalone: true,
  imports: [CategoriasCRUDTableComponent],
  templateUrl: './crudcategorias.component.html',
  styleUrl: './crudcategorias.component.css'
})
export class CRUDCategoriasComponent {
      private adminService = inject(AdminService);
    
      
      arrCategorias: ICategoria[];
      
      cargando: boolean = true; // Variable para controlar el estado de carga
    
      constructor() {
        this.arrCategorias = [];
      }
      ngOnInit() {

        this.loadCategorias();

      }

      //Empresa
      loadCategorias() {
        this.adminService.getAllCategorias().subscribe((data: ICategoria[]) => {
          this.arrCategorias = data;
          this.cargando = false;			
        })
      }
    }
