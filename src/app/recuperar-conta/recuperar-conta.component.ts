import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../serviços/usuario.service';
import { Router } from '@angular/router';
import { DialogService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-recuperar-conta',
  templateUrl: './recuperar-conta.component.html',
  styleUrls: ['./recuperar-conta.component.css'],
  providers: [MessageService, DialogService]
})
export class RecuperarContaComponent implements OnInit {
  siape: string;
  usuario: any;
  perguntaDeSeguranca: string;
  respostaDeSeguranca: string;
  ocultar = false;

  constructor(private usuarioService: UsuarioService, private router: Router,
    private messageService: MessageService, public dialogService: DialogService) { }

  ngOnInit() {
  }

  continuar(){
    this.usuarioService.listarTodos().subscribe(resultado => {
      for(let i = 0; i < resultado.length; i++){
        if(resultado[i].siape == this.siape){
          this.usuario = resultado[i];
          if(this.usuario.respostaDeSeguranca == null){
            this.mostrarErro(4);
          }else{
            this.atualizarTela();
          }
          return;
        }
      }

      this.mostrarErro(1);
    });

  }

  mostrarErro(erro){
    if(erro == 1){
      this.messageService.add({severity:'error', summary: 'Erro!', detail: "Siape inválida."});
    }else if(erro == 2){
      this.messageService.add({severity:'error', summary: 'Erro!', detail: "Todos os campos precisam estar corretamente preenchidos."});
    }else if(erro == 3){
      this.messageService.add({severity:'error', summary: 'Erro!', detail: "Senha incorreta."});
    }else{
      this.messageService.add({severity:'error', summary: 'Erro!', detail: "O usuário não tem nenhuma pergunta de segurança cadastrada."});
    }
  }

  verificar(){
    if(this.respostaDeSeguranca == null || this.respostaDeSeguranca == undefined || this.respostaDeSeguranca.length <= 0){
        this.mostrarErro(2);
    }else{
      this.usuarioService.loginComPerguntaDeSeguranca(this.siape, this.usuario.perguntaDeSeguranca, this.respostaDeSeguranca).subscribe(resultado => {
        if(resultado == 3){
          this.mostrarErro(3);
        }else{
          this.irParaTrocarASenha();
        }
      });
    }
  }

  irParaTrocarASenha(){
    this.usuarioService.listarTodos().subscribe(resultado => {
      for(let i = 0; i < resultado.length; i++){
        if(resultado[i].siape == this.siape){
          sessionStorage.setItem('id-usuario', resultado[i].id);
          sessionStorage.setItem('toast','C');
          this.router.navigate(["/trocar-senha/", resultado[i].id]);
        }
      }
    });
  }

  atualizarTela(){
    this.ocultar = true;

    let pds = this.usuario.perguntaDeSeguranca;
    if(pds == 1){
      this.perguntaDeSeguranca = 'Qual o seu filme/série favorito?';
    }else if(pds == 2){
      this.perguntaDeSeguranca = 'Qual o nome do seu primeiro animal de estimação?';
    }else{
      this.perguntaDeSeguranca = 'Qual o nome de solteira de sua mãe?';
    }
  }

  voltar(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}