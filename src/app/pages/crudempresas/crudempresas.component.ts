import { Component, inject } from '@angular/core';
import { EmpresasCRUDTableComponent } from "../../components/empresas-crudtable/empresas-crudtable.component";
import { AdminService } from '../../services/admin.service';
import { IempresaTable } from '../../interfaces/iempresa-table';

@Component({
  selector: 'app-crudempresas',
  standalone: true,
  imports: [EmpresasCRUDTableComponent],
  templateUrl: './crudempresas.component.html',
  styleUrl: './crudempresas.component.css'
})
export class CRUDEmpresasComponent {
		
      private adminService = inject(AdminService);
    
      
      arrEmpresas: IempresaTable[];
      
      cargando: boolean = true; // Variable para controlar el estado de carga
    
      constructor() {
        this.arrEmpresas = [];
      }
      ngOnInit() {

        this.loadEmpresas();

      }

      //Empresa
      loadEmpresas() {
        this.adminService.getAllEmpresasTable().subscribe((data: IempresaTable[]) => {
          this.arrEmpresas = data;
          this.cargando = false;			
        })
      }
    }