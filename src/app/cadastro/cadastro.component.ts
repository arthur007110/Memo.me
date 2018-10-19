import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DadosService } from '../dados.service';
import { Usuario } from '../models/usuario';

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

  constructor(private router: Router, private dadosService: DadosService) { }

  ngOnInit() {

  }

  irParaTelaDeLogin(){
    this.router.navigate(["/login"])
  }

  cadastrar(){
    if(this.verificarCampos()){

      if(this.dadosService.getUsuariosPorSiape(this.siape) == null){

        this.dadosService.setUsuario(this.nome, this.siape, this.senha);
        alert("Usuário cadastrado.");
        this.irParaTelaDeLogin();

      }else{

        alert("Esta siape já está sendo utilizada.");

      }
    }
  }

  verificarCampos(){
    //Verifica se não há campos vazios ou se as senhas não são iguais
    if(this.nome != null && this.siape != null && this.senha != null && this.senha2 != null){
      if(this.senha == this.senha2){
          return true;
      }else{
        alert("As senhas não são iguais.");
        return false;
      }
    }else{
      alert("Existem campos que ainda não foram preenchidos.");
      return false;
    }
  }



}


