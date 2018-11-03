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

  constructor(private router: Router, private usuarioService: UsuarioService,private messageService: MessageService) { }

  ngOnInit() {
  }

  mostrarMsg(){
    this.msgErroSiape = false;
    this.msgErroSenha = false;
  }

  irParaTelaDeLogin(){
    this.router.navigate(["/login"]);
    return null;
  }

  cadastrar(){
    if(this.usuarioService.verificarUsuario(this.nome,this.siape,this.senha,this.senha2)){
      this.mostrarSucesso();
      this.executarTimer();
    }else{
      this.msgErroSiape = true;
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

  mostrarSucesso() {
    this.messageService.add({severity:'success', summary: 'Cadastrado!', detail:'cadastro feito com sucesso'});
  }

}