import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DadosService} from 'src/app/servicos/servicoDados';
import {enableProdMode} from '@angular/core';
enableProdMode();

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario = new Usuario("","","","");
  nome="";
  siape="";
  id="";
  senha="";
  senha2="";

  cadastrar(){

    if(this.senha != this.senha2){
      this.printarerrosenha();
      this.limparsenhas();
    }else if(this.temcamposvazios()){
    this.printarerrocampos();
    this.limparsenhas();
      }else{
      this.salvarDados();
      this.irparatelalogin();
      }
  }

  irParaTeladeLogin(){
    this.router.navigate(['/login']);
  }

  temcamposvazios(){
    if(this.nome==""){
      return true;
    }if(this.siape==""){
      return true;
    }if(this.id==""){
      return true;
    }if(this.senha==""){
      return true;
    }if(this.senha2==""){
      return true;
    }else{
      return false;
    }
  }
  limparsenhas(){
    this.senha="";
    this.senha2="";
  }
  printarerrosenha(){
    alert("as senhas não coencidem");
  }
  printarerrocampos(){
    alert("há campos vazios, para proseguir corrija-os");
  }
  irparatelalogin(){
    this.router.navigate(['/login']);
  }
  
  salvarDados(){

    this.usuario;
    this.usuario.setNome(this.nome);
    this.usuario.getID();
    this.usuario.setSiape(this.siape);
    this.usuario.setSenha(this.senha);

    this.dados.adicionarUsuario(this.usuario);


  }
  constructor(private router: Router, private dados: DadosService) { }

  ngOnInit() {
  }

}





class Usuario{

constructor(nome,id,siape,senha){
  this.id=id;
  this.siape=siape;
  this.nome=nome;
  this.senha=senha;
}

  nome;
  id;
  siape;
  senha;
  
  getNome(){
      return this.nome;
  }
  setNome(nome){
      this.nome=nome;
  }
  getSsiape(){
      return this.siape;
  }
  setSiape(siape){
      this.siape=siape;
  }
  getID(){
      return this.id;
  }
  setID(id){
      this.id=id;
  }
  getSenha(){
      return this.senha;
  }
  setSenha(senha){
      this.senha=senha;
  }
  
  }


