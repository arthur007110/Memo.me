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

  fazerLogin(){
    // FALTA COLOCAR O TOAST. VAI ALERT POR ENQUANTO MESMO
    let verificacao = this.usuarioService.verificacaoDeLogin(this.siape, this.senha);
    console.log(verificacao);
    if(verificacao == 0){
      sessionStorage.setItem('siape', this.siape);
      this.irParaTelaHome();
    }else if(verificacao == 1){
      sessionStorage.setItem('siape', this.siape);
      this.irParaTelaHomeAdm();
    }else if(verificacao == 2){
      alert("Preencha todos os campos.");
    }else if(verificacao ==  3){
      alert("Esse usuário não consta no sistema.");
    }else if(verificacao ==  4){
      alert("Siape e senha não coincidem.");
    }else if(verificacao == 5){
      alert("Este usuario não está cadastrado em nenhum setor, por favor comunique ao ADMIN");
    }
  }

  irParaTelaHome(){
    this.router.navigate(["/recebidos",this.siape]);
  }
  
  irParaTelaHomeAdm(){
    this.router.navigate(["/listar-setores", this.siape]);
  }

  irParaTelaDeCadastro(){
    this.router.navigate(["/cadastro"]);
  }

}
