import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { MessageService } from 'primeng/api';
import { Usuario } from '../models/Usuario';

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

  constructor(private router: Router, private usuarioService: UsuarioService, private messageService: MessageService) { }

  ngOnInit() {
  }

  mostrarMsg(){
    this.msgErroSiape = false;
    this.msgErroSenha = false;
  }


  cadastrar(){

    //Verifica sem as duas senhas são iguais
    if(this.senha != this.senha2){
      this.mostrarErro(7);
      return;
    }

    let usuario = new Usuario("", this.nome, this.siape, this.senha, null);

    //Verifica se todas as informações são válidas
    if(usuario.verificarCampos()){
      //Tenta cadastrar no banco
      this.usuarioService.verificarCadastro(usuario).subscribe(resultado => {
        if(resultado){
          sessionStorage.setItem('toast','6');
          this.voltar();
        }else{
          this.mostrarErro(8);
        }
      });
    }else{
      this.mostrarErro(9);
    }
  }

  mostrarErro(erro){

    if(erro==7){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Senhas não coincidem.'});
    }else if(erro==8){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Esta siape já está sendo utilizada.'});
    }else if(erro==9){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Preencha todos os campos corretamente.'});
    }

  }

  voltar(){
    this.usuarioService.listarTodos().subscribe(resultado => {
      for(let i = 0; i < resultado.length; i++){
        if(resultado[i].siape == this.siape){
          sessionStorage.setItem('id-usuario', resultado[i].id);
          this.router.navigate(["/listar-setores", resultado[i].id]);
        }
      }
    });
  }

  /*executarTimer(){

    let timeLeft: number = 1;
    let interval;

    interval = setInterval(() => {
      if(timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        this.voltar();
      }
    },1000);
  }*/

}