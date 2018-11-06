import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { MessageService } from 'primeng/api';

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

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private messageService: MessageService) { }

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
    // FALTA COLOCAR O TOAST. VAI ALERT POR ENQUANTO MESMO
    let verificacao = this.usuarioService.verificacaoDeCadastro(this.nome,this.siape,this.senha,this.senha2);
    if(verificacao == 0){
      this.messageService.add({severity:'success', summary: 'Cadastrado!', detail:'cadastro feito com sucesso'});
      this.executarTimer();
    }else if(verificacao == 1){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'preencha todos os campos.'});
    }else if(verificacao == 2){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'nome inválido.'});
    }else if(verificacao == 3){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'está siape já está sendo utilizada.'});
    }else if(verificacao == 4){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'senhas não coincidem.'});
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