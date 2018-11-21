import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  siape: string;
  senha: string;

  constructor(private router: Router, private usuarioService: UsuarioService, private messageService: MessageService) { }

  ngOnInit(){
  }

  fazerLogin(){
    // FALTA COLOCAR O TOAST. VAI ALERT POR ENQUANTO MESMO
    this.usuarioService.listarTodos().subscribe(resultado => {
      let usuarios = resultado;
      let verificacao = this.usuarioService.verificacaoDeLogin(this.siape, this.senha, usuarios);
      if(verificacao == 0){
        this.messageService.add({severity:'success', summary: 'Logado!', detail:'login feito com sucesso'});
        this.executarTimer();
      }else if(verificacao == 1){
        this.messageService.add({severity:'success', summary: 'Logado!', detail:'login feito com sucesso,Bem vindo ADM'});
        this.executarTimerAdm();
      }else if(verificacao == 2){
        this.messageService.add({severity:'error', summary: 'Erro!', detail:'preencha todos os campos.'});
      }else if(verificacao ==  3){
        this.messageService.add({severity:'error', summary: 'Erro!', detail:'este usuário não consta no sistema.'});
      }else if(verificacao ==  4){
        this.messageService.add({severity:'error', summary: 'Erro!', detail:'siape e senha não coincidem.'});
      }else if(verificacao == 5){
        this.messageService.add({severity:'error', summary: 'Erro!', detail:'este usuario não está cadastrado em nenhum setor, por favor comunique ao ADMIN'});
      }
    });
  }

  irParaTelaHome(){
    this.usuarioService.listarTodos().subscribe(resultado => {
      for(let i = 0; i < resultado.length; i++){
        if(resultado[i].siape == this.siape){
          sessionStorage.setItem('id-usuario', resultado[i].id);
          this.router.navigate(["/recebidos", resultado[i].id]);
        }
      }
    });
  }
  
  irParaTelaHomeAdm(){
    this.usuarioService.listarTodos().subscribe(resultado => {
      for(let i = 0; i < resultado.length; i++){
        if(resultado[i].siape == this.siape){
          sessionStorage.setItem('id-usuario', resultado[i].id);
          this.router.navigate(["/listar-setores", resultado[i].id]);
        }
      }
    });
  }

  irParaTelaDeCadastro(){
    this.router.navigate(["/cadastro"]);
  }

  executarTimer(){

    let timeLeft: number = 1;
    let interval;

    interval = setInterval(() => {
      if(timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        this.irParaTelaHome();
      }
    },1000);
  }
  executarTimerAdm(){

    let timeLeft: number = 1;
    let interval;

    interval = setInterval(() => {
      if(timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        this.irParaTelaHomeAdm();
      }
    },1000);
  }

}
