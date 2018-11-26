import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { MessageService } from 'primeng/api';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [MessageService]

})
export class CadastroComponent implements OnInit {

  nome: string;
  siape: string;
  id: string;
  senha: string;
  senha2: string;

  msgErroSiape: boolean = false;
  msgErroSenha: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService, private messageService: MessageService) { }

  ngOnInit() {
  }

  mostrarMsg(){
    this.msgErroSiape = false;
    this.msgErroSenha = false;
  }

  irParaTelaDeLogin(){
    this.router.navigate([""]);
    return null;
  }

  cadastrar(){

    //Verifica sem as duas senhas são iguais
    if(this.senha != this.senha2){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Senhas não coincidem.'});
      return;
    }

    let usuario = new Usuario("", this.nome, this.siape, this.senha, null);

    //Verifica se todas as informações são válidas
    if(usuario.verificarCampos()){
      //Tenta cadastrar no banco
      this.usuarioService.verificarCadastro(usuario).subscribe(resultado => {
        if(resultado){
          this.messageService.add({severity:'success', summary: 'Cadastrado!', detail:'Cadastro realizado com sucesso'});
          this.executarTimer();
        }else{
          this.messageService.add({severity:'error', summary: 'Erro!', detail:'Esta siape já está sendo utilizada.'});
        }
      });
    }else{
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Preencha todos os campos corretamente.'});
    }
  }

  executarTimer(){

    let timeLeft: number = 1;
    let interval;

    interval = setInterval(() => {
      if(timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        this.irParaTelaDeLogin();
      }
    },1000);
  }

}