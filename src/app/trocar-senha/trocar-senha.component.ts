import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { UsuarioService } from '../serviços/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.css']
})
export class TrocarSenhaComponent implements OnInit {
  idDoUsuario: string;
  novaSenha1: string;
  novaSenha2: string;

  perguntasDeSeguranca: SelectItem[];
  perguntaSelecionada: number = 1;
  respostaDeSeguranca: string;

  constructor(private usuarioService: UsuarioService, private router: Router) { 
    this.idDoUsuario = sessionStorage.getItem('id-usuario');
    this.perguntasDeSeguranca = [
      {label: 'Qual o seu filme/série favorito?', value: '1'},
      {label: 'Qual o nome do seu primeiro animal de estimação?', value: '2'},
      {label: 'Qual o nome de solteira de sua mãe?', value: '3'}
    ];
  }

  ngOnInit() {
  }

  salvar(){
    if(this.perguntaSelecionada == null || this.respostaDeSeguranca == null ||
      this.perguntaSelecionada == undefined || this.respostaDeSeguranca == undefined ||
      this.novaSenha1 == null || this.novaSenha1 == undefined ||
      this.novaSenha2 == null || this.novaSenha2 == undefined){
        //Colocar um TOAST aqui
        alert('Todos os campos precisam estar corretamente preenchidos.');
    }else{
      this.usuarioService.atualizarSenhaDoUsuario(this.idDoUsuario, this.novaSenha1, this.perguntaSelecionada, this.respostaDeSeguranca);
      this.router.navigate(["/recebidos", this.idDoUsuario]);
    }
  }

}
