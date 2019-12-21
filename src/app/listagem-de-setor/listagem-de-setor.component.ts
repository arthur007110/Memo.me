import { Component, OnInit } from '@angular/core';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { MessageService, DialogService } from 'primeng/api';
import { ListaDeMembrosDoSetorComponent } from '../lista-de-membros-do-setor/lista-de-membros-do-setor.component';

@Component({
  selector: 'app-listagem-de-setor',
  templateUrl: './listagem-de-setor.component.html',
  styleUrls: ['./listagem-de-setor.component.css'],
  providers: [MessageService, DialogService]
})
export class ListagemDeSetorComponent implements OnInit {
  id: string;
  setores: Setor[] = [];
  usuarios = [];

  constructor(private setorService: SetorService, 
    private router: Router, 
    private usuariosService: UsuarioService, 
    public dialogService: DialogService, 
    private messageService: MessageService) { }

  ngOnInit() {
    this.id = sessionStorage.getItem('id-usuario');
    let toast = sessionStorage.getItem('toast');
    this.executarTimer(toast);
    this.getSetores();
  }

  mostrarToast(toast){
    if(toast=='6'){
      this.messageService.add({severity:'success', summary: 'Cadastrado!', detail:'cadastro realizado com sucesso'});
      sessionStorage.removeItem('toast');
    }else if(toast=='1'){
      this.messageService.add({severity:'success', summary: 'Logado!', detail:'login feito com sucesso. Bem vindo ADM!'});
      sessionStorage.removeItem('toast');
    }else if(toast=='12'){
      this.messageService.add({severity:'success', summary: 'Cadastrado!', detail:'cadastro do setor realizado com sucesso!'});
      sessionStorage.removeItem('toast');
    }else if(toast=='15'){
      this.messageService.add({severity:'success', summary: 'Atualizado!', detail:'o setor foi atualizado com sucesso!'});
      sessionStorage.removeItem('toast');
    }else if(toast == '16'){
      this.messageService.add({severity:'success', summary: 'Atualizado!', detail:'O padrão foi atualizado.'});
      sessionStorage.removeItem('toast');
    }

  }

  executarTimer(toast){
    let timeLeft: number = 1;
    let interval;

    interval = setInterval(() => {
      if(timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        this.mostrarToast(toast);
      }
    },200);
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
    })
  }

  atualizar(id){
    this.router.navigate(['/atualizar-setor', id]);
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