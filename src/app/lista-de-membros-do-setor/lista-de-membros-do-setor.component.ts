import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../serviços/usuario.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-lista-de-membros-do-setor',
  templateUrl: './lista-de-membros-do-setor.component.html',
  styleUrls: ['./lista-de-membros-do-setor.component.css']
})
export class ListaDeMembrosDoSetorComponent implements OnInit {

  idDoSetor;
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.idDoSetor = this.config.data.id;
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuarioService.listarPorSetor(this.idDoSetor).subscribe(resultado => {
      this.usuarios = resultado;
    });
  }

}
