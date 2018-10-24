import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  siape: string;
  senha: string;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(){
    
  }

  logar(){
    if(this.siape != null && this.senha != null){
      let usuario = this.usuarioService.getUsuariosPorSiape(this.siape);
      if(usuario != null){
        if(usuario.getsetor()!=null){
          console.log(usuario.getsetor());
        if(usuario.getSenha() == this.senha){
          sessionStorage.setItem("siape",this.siape);
          if(usuario.getID() == 0){
            this.irParaTelaHomeAdm();
          }else{
            this.irParaTelaHome();
          }
        }else{
          alert("Siape ou senha incorretos.");
          this.siape = null;
          this.senha = null;
        }
      }else{
        alert("Este usuario não está cadastrado em nenhum setor, por favor comunique ao ADMIN")
      }
      }else{
        alert("Não há usuários cadastrados com essa siape.");
        this.siape = null;
        this.senha = null;
      }
    }else{
      alert("Existem campos que ainda não foram preenchidos.");
    }
  }

  irParaTelaHome(){
    this.router.navigate(["/home",this.siape]);
  }
  
  irParaTelaHomeAdm(){
    this.router.navigate(["/home-adm", this.siape]);
  }

  irParaTelaDeCadastro(){
    this.router.navigate(["/cadastro"]);
  }

}
