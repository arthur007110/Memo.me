import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../serviços/usuario.service';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html',
  styleUrls: ['./cadastro-setor.component.css'],
  providers: [MessageService]
})
export class CadastroSetorComponent implements OnInit {
  nome: string;
  msgErro: boolean = false;
  texto: string = null;
  resultados: string[] = [];
  usuarios: any[] = [];

  constructor(private router: Router, private usuarioService: UsuarioService,  private setorService: SetorService, private messageService: MessageService,){}

  ngOnInit(){
    this.getUsuarios();
  }

  //Inicia o array usuarios e resultados
  getUsuarios(){
    this.usuarioService.listarUsuariosSemSetor().subscribe(resultado => {
      this.usuarios = resultado;
      for(let i = 0; i < this.usuarios.length; i++){
        this.resultados.push(this.usuarios[i].siape);
      }
    })
  }

  //Atualiza o array resultado conforme a entrada do usuário
  buscar(event){
    let arr = [];
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].siape.indexOf(event.query) != -1){
        arr.push(this.usuarios[i].siape);
      }
    }
    this.resultados = arr;
  }

  //Tenta cadastrar o usuário
  cadastrar(){
    let setor = new Setor("", this.nome, this.getUsuarioDoSetor());
    if(setor.verificarCampos()){
      this.setorService.cadastrar(setor).subscribe(resultado => {
        if(resultado){
          sessionStorage.setItem('toast','12');
          this.voltar();
        }else{
          this.messageService.add({severity:'error', summary: 'Erro!', detail:'este nome já está sendo utilizado.'});
        }
      })
    }else{
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'preencha todos os campos corretamente.'});
    }
  }

  //Procura o usuário id do usuário escolhido no array de resultados
  getUsuarioDoSetor(){
    console.log(this.texto)
    console.log(this.texto.length);
    if(this.texto != undefined && this.texto.length == 7){
      for(let i = 0; i < this.usuarios.length; i++){
        if(this.usuarios[i].siape == this.resultados[0]){
          return this.usuarios[i].id;
        }
      }
    }
  }

  //Volta para o tela de listagem de setores
  voltar(){

    let timeLeft: number = 1;
    let interval;

    interval = setInterval(() => {
      if(timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        this.router.navigate(['listar-setores/',sessionStorage.getItem('id-usuario')]);
      }
    },500);
  }

  mostrarMsg(){
    this.msgErro = false;
  }
}