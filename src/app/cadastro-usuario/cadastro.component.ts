import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {

  nome: string;
  siape: string;
  id: string;
  senha: string;
  senha2: string;

  msgErroSiape: boolean = false;
  msgErroSenha: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService,private messageService: MessageService) { }

  ngOnInit() {

  }

  irParaTelaDeLogin(){
    this.router.navigate(["/login"])
  }

  cadastrar(){
    if(this.usuarioService.verificarUsuario(this.nome,this.siape,this.senha,this.senha2)){

      this.mostrarSucesso();

    }else{
      this.msgErroSiape = true;
    }

    
  }

  mostrarSucesso() {
    this.messageService.add({severity:'Cadastrado', summary: 'Success Message', detail:'Cadastro feito com sucesso!'});
}

}