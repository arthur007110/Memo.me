import { Component, OnInit } from '@angular/core';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-listagem-de-setor',
  templateUrl: './listagem-de-setor.component.html',
  styleUrls: ['./listagem-de-setor.component.css'],
  providers: [MessageService]
})
export class ListagemDeSetorComponent implements OnInit {
  id: string;
  setores: Setor[] = [];
  usuarios = [];
  display: boolean = false;
  usuariosDoSetor: any[] = [];

  constructor(private setorService: SetorService, 
    private router: Router, 
    private usuariosService: UsuarioService, 
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

  showDialog(idDoSetor) {
    this.usuariosDoSetor = [];
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].idDoSetor == idDoSetor){
        this.usuariosDoSetor.push(this.usuarios[i]);
      }
    }
    this.display = true;
  }

  getNomeDoUsuario(setor){
    let id = setor.id;
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].idDoSetor == id){
        return this.usuarios[i].nome;
      }
    }
  }

  getSiapeDoUsuario(setor){
    let id = setor.id;
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].idDoSetor == id){
        return this.usuarios[i].siape;
      }
    }
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
}