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

  logar(){
    this.usuarioService.verificarLogin(this.siape, this.senha).subscribe(resultado => {
      if(resultado == 1){
        console.log("Resultado: " + resultado);
        console.log("Resultado == 1: " + (resultado == 0));
        this.messageService.add({severity:'error', summary: 'Erro!', detail:'Esse usuário ainda não possui um setor. Por favor contate o adm.'});
      }else if(resultado == 2){
        if(this.siape == "0000000"){
          this.messageService.add({severity:'success', summary: 'Logado!', detail:'Login feito com sucesso. Bem vindo ADM!'});
          this.executarTimerAdm();
        }else{
          this.messageService.add({severity:'success', summary: 'Logado!', detail:'Login feito com sucesso. Bem vindo!'});
          this.executarTimer();
        }
      }else{
        this.messageService.add({severity:'error', summary: 'Erro!', detail:'Login ou senha incorretos.'});
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
