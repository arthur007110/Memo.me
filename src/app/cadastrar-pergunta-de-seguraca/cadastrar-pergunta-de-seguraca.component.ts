import { Component, OnInit } from '@angular/core';
import { SelectItem, DialogService, MessageService } from 'primeng/api';
import { UsuarioService } from '../serviços/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-pergunta-de-seguraca',
  templateUrl: './cadastrar-pergunta-de-seguraca.component.html',
  styleUrls: ['./cadastrar-pergunta-de-seguraca.component.css'],
  providers: [MessageService, DialogService]
})
export class CadastrarPerguntaDeSeguracaComponent implements OnInit {
  idDoUsuario: string;
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
    
  }

  mostrarErro(){
    this.messageService.add({severity:'error', summary: 'Erro!', detail: "Todos os campos precisam estar corretamente preenchidos"});
  }

  salvar(){
    if(this.perguntaSelecionada == null || this.respostaDeSeguranca == null ||
      this.perguntaSelecionada == undefined || this.respostaDeSeguranca == undefined){
        this.mostrarErro();
    }else{
      this.usuarioService.cadastrarPDS(this.idDoUsuario, this.perguntaSelecionada, this.respostaDeSeguranca);
      sessionStorage.setItem('toast','B');
      this.router.navigate(["/recebidos", this.idDoUsuario]);
    }
  }

  voltar(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
