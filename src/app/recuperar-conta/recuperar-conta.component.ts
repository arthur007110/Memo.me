import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../serviços/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-conta',
  templateUrl: './recuperar-conta.component.html',
  styleUrls: ['./recuperar-conta.component.css']
})
export class RecuperarContaComponent implements OnInit {
  siape: string;
  usuario: any;
  perguntaDeSeguranca: string;
  respostaDeSeguranca: string;
  ocultar = false;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  continuar(){
    this.usuarioService.listarTodos().subscribe(resultado => {
      for(let i = 0; i < resultado.length; i++){
        if(resultado[i].siape == this.siape){
          this.usuario = resultado[i];
          this.atualizarTela();
          return;
        }
      }

      //Colocar um TOAST aqui
      alert("Erro");
    });

  }

  verificar(){
    if(this.respostaDeSeguranca == null || this.respostaDeSeguranca == undefined || this.respostaDeSeguranca.length <= 0){
        //Colocar um TOAST aqui
        alert('Todos os campos precisam estar corretamente preenchidos.');
    }else{
      this.usuarioService.loginComPerguntaDeSeguranca(this.siape, this.usuario.perguntaDeSeguranca, this.respostaDeSeguranca).subscribe(resultado => {
        if(resultado == 3){
          //Colocar um TOAST aqui
          alert('Erro!');
        }else{
          this.irParaTrocarASenha();
        }
      });
    }
  }
  /*
  continuar(){
    if(this.perguntaSelecionada == null || this.respostaDeSeguranca == null ||
      this.perguntaSelecionada == undefined || this.respostaDeSeguranca == undefined ||
      this.siape == null || this.siape == undefined || this.siape.length == 0){
        //Colocar um TOAST aqui
        alert('Todos os campos precisam estar corretamente preenchidos.');
    }else{
      this.usuarioService.loginComPerguntaDeSeguranca(this.siape, this.perguntaSelecionada, this.respostaDeSeguranca).subscribe(resultado => {
        if(resultado == 3){
          //Colocar um TOAST aqui
          alert('Erro!');
        }else{
          this.irParaTrocarASenha();
        }
      });
    }
  }
  */

  irParaTrocarASenha(){
    this.usuarioService.listarTodos().subscribe(resultado => {
      for(let i = 0; i < resultado.length; i++){
        if(resultado[i].siape == this.siape){
          sessionStorage.setItem('id-usuario', resultado[i].id);
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
}
