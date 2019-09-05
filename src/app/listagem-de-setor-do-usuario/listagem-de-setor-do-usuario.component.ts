import { Component, OnInit } from '@angular/core';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { DialogService, MessageService } from 'primeng/api';
import { ListaDeMembrosDoSetorComponent } from '../lista-de-membros-do-setor/lista-de-membros-do-setor.component';


@Component({
  selector: 'app-listagem-de-setor-do-usuario',
  templateUrl: './listagem-de-setor-do-usuario.component.html',
  styleUrls: ['./listagem-de-setor-do-usuario.component.css'],
  providers: [MessageService, DialogService]
})
export class ListagemDeSetorDoUsuarioComponent implements OnInit {
  id: string;
  setores: Setor[] = [];
  usuarios = [];
  
  constructor(private setorService: SetorService, 
    private usuariosService: UsuarioService, 
    private router: Router,
    public dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.id = sessionStorage.getItem('id-usuario');
    this.getSetores();
  }

  getSetores(){
    this.setorService.listarTodos().subscribe(listaSetores=>{
      let setArr = listaSetores;
      this.setores = setArr;
      this.getUsuarios();
    });
  }

  getUsuarios(){
    this.usuariosService.listarTodos().subscribe(listaDeUsuarios=>{
      let userArr = listaDeUsuarios;
      this.usuarios = userArr;
    });
  }

  show(idDoSetor, nomeDoSetor){
    const ref = this.dialogService.open(ListaDeMembrosDoSetorComponent, {
      data: {
        id: idDoSetor
      },
      header: 'Usuários do setor: '+nomeDoSetor,
      width: '70%'
    });
  }
}
