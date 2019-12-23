import { Component, OnInit } from '@angular/core';
import { SelectItem, DialogService, MessageService } from 'primeng/api';
import { UsuarioService } from '../serviços/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.css'],
  providers: [MessageService, DialogService]
})
export class TrocarSenhaComponent implements OnInit {
  idDoUsuario: string;
  usuario: any;
  novaSenha1: string;
  novaSenha2: string;

  perguntasDeSeguranca: SelectItem[];
  perguntaSelecionada: number = 1;
  respostaDeSeguranca: string;

  constructor(private usuarioService: UsuarioService, private router: Router,
    private messageService: MessageService, public dialogService: DialogService) { 
    this.idDoUsuario = sessionStorage.getItem('id-usuario');
    this.perguntasDeSeguranca = [
      {label: 'Qual o seu filme/série favorito?', value: '1'},
      {label: 'Qual o nome do seu primeiro animal de estimação?', value: '2'},
      {label: 'Qual o nome de solteira de sua mãe?', value: '3'}
    ];
  }

  ngOnInit() {
    let toast = sessionStorage.getItem('toast');
    this.executarTimer(toast);
  }

  mostrarErro(erro){
    if(erro == 1){
      this.messageService.add({severity:'error', summary: 'Erro!', detail: "Todos os campos precisam estar corretamente preenchidos"});
    }else{
      this.messageService.add({severity:'error', summary: 'Erro!', detail: "As senhas não coincidem."});
    }
  }
  
  executarTimer(toast){
    let timeLeft: number = 1;
    let interval;

    interval = setInterval(() => {
        if(timeLeft > 0) {
            timeLeft--;
        }else {
            clearInterval(interval);
            this.mostrarToast(toast);
        }
    },200);
  }

  mostrarToast(toast){
    if(toast == 'C'){
        this.messageService.add({severity:'success', summary: 'Logado', detail:'Login feito com sucesso.'});
        sessionStorage.removeItem('toast');
    }
}

  salvar(){
    if(this.novaSenha1 != this.novaSenha2){
      this.mostrarErro(2);
      return;
    }

    if(this.perguntaSelecionada == null || this.respostaDeSeguranca == null ||
      this.perguntaSelecionada == undefined || this.respostaDeSeguranca == undefined || this.respostaDeSeguranca.length <= 0 ||
      this.novaSenha1 == null || this.novaSenha1 == undefined ||
      this.novaSenha2 == null || this.novaSenha2 == undefined){
        this.mostrarErro(1);
    }else{
      this.usuarioService.atualizarSenhaDoUsuario(this.idDoUsuario, this.novaSenha1, this.perguntaSelecionada, this.respostaDeSeguranca);
      sessionStorage.setItem('toast','A');
      this.router.navigate(["/recebidos", this.idDoUsuario]);
    }
  }

  voltar(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
