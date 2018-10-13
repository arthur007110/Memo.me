import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router) { }

  title = 'app';
  senha="";
  siape="";

  logar(){
    if(this.siape=="admin" && this.senha=="admin"){
      this.router.navigate(['/home']);
      console.log("aaaaaaaa");
    }else{
      alert("as credenciais não estão corretas");
      this.limparDados();
    }
  }
  limparDados(){
    this.siape="";
    this.senha="";
  }
  cadastrar(){
    this.router.navigate(['/cadastro']);
  }
  ngOnInit() {
  }

}
