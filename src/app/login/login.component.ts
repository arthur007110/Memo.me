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

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private messageService: MessageService) { }

  ngOnInit(){
    
  }

  fazerLogin(){
    // FALTA COLOCAR O TOAST. VAI ALERT POR ENQUANTO MESMO
    let verificacao = this.usuarioService.verificacaoDeLogin(this.siape, this.senha);
    console.log(verificacao);
    if(verificacao == 0){
      this.messageService.add({severity:'success', summary: 'Logado!', detail:'login feito com sucesso'});
      sessionStorage.setItem('siape', this.siape);
      this.executarTimer();
    }else if(verificacao == 1){
      sessionStorage.setItem('siape', this.siape);
      this.irParaTelaHomeAdm();
    }else if(verificacao == 2){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'preencha todos os campos.'});
    }else if(verificacao ==  3){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'este usuário não consta no sistema.'});
    }else if(verificacao ==  4){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'siape e senha não coincidem.'});
    }else if(verificacao == 5){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'este usuario não está cadastrado em nenhum setor, por favor comunique ao ADMIN'});
    }
  }

  irParaTelaHome(){
    this.router.navigate(["/recebidos",this.siape]);
  }
  
  irParaTelaHomeAdm(){
    this.router.navigate(["/listar-setores", this.siape]);
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

}
