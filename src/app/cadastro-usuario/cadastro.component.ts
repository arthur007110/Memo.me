import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  nome: string;
  siape: string;
  id: string;
  senha: string;
  senha2: string;

  msgErroSiape: boolean = false;
  msgErroSenha: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {

  }

  irParaTelaDeLogin(){
    this.router.navigate(["/login"])
  }

  cadastrar(){
    if(this.verificarCampos()){

      if(this.usuarioService.getUsuariosPorSiape(this.siape) == null){

        if(this.verificaSiapeAvancado()){
          alert("Por favor, preencha todos os campos da siape");
        }else{
        this.usuarioService.setUsuario(this.nome, this.siape, this.senha, null);
        alert("Usuário cadastrado.");
        this.irParaTelaDeLogin();
        }

      }else{

        this.msgErroSiape = true;
        this.siape = null;

      }
    }
  }

  verificarCampos(){
    //Verifica se não há campos vazios ou se as senhas não são iguais
    if(this.nome != null && this.siape != null && this.siape.charAt(0) != "_" && this.senha != null && this.senha2 != null){
      if(this.senha == this.senha2){
          return true;
      }else{
        this.msgErroSenha = true;
        return false;
      }
    }else{
      alert("Existem campos que ainda não foram preenchidos.");
      return false;
    }
  }
  verificaSiapeAvancado(){

    for(let i=0;i<this.siape.length;i++){
      if(this.siape.charAt(i)=='_'){
        return true;
      }
    }
    return false;

  }



}