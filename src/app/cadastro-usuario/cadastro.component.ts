import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { MessageService } from 'primeng/api';
import { Usuario } from '../models/Usuario';
import { SetorService } from '../serviços/setor.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [MessageService]

})
export class CadastroComponent implements OnInit {
  nome: string;
  email: string;
  siape: string;
  idDoSetor: string;
  id: string;
  senha: string;
  senha2: string;
  setorEscolhido: any;
  texto: string;
  setores: any[];
  resultados: any[];

  constructor(private router: Router, 
    private usuarioService: UsuarioService, 
    private setorService: SetorService, 
    private messageService: MessageService) { }

  ngOnInit() {
    this.getSetores();
  }

  getSetores(){
    this.setorService.listarTodos().subscribe(resultado => {
      this.setores = resultado;
    });
  }

  buscar(event){
    let arr = [];
    for(let i = 0; i < this.setores.length; i++){
      if(this.setores[i].nome.indexOf(event.query) != -1){
        arr.push(this.setores[i].nome);
      }
    }
    this.resultados = arr;
    this.texto = event.query;
  }

  getIdDoSetor(){
    for(let i = 0; i < this.setores.length; i++){
      if(this.setores[i].nome == this.setorEscolhido.nome){
        return this.setores[i].id;
      }
    }
  }

  cadastrar(){
    //Verifica sem as duas senhas são iguais
    if(this.senha != this.senha2){
      this.mostrarErro(7);
      return;
    }
    let usuario
    if(this.setorEscolhido == null){
      this.mostrarErro(5);
    }else{
      usuario = new Usuario("", this.nome, this.email, this.siape, this.senha, this.getIdDoSetor());
    }
    
    //Verifica se todas as informações são válidas
    /*if(usuario.verificarCampos()){
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
    }*/
    let verificacao =  usuario.verificarCampos();
    console.log(verificacao);
    switch(verificacao){
      case 1:
          this.mostrarErro(1);
        break;
      case 2:
          this.mostrarErro(2);
        break;
      case 3:
          this.mostrarErro(3);
        break;
      case 4:
          this.mostrarErro(4);
        break;
      case 5:
          this.mostrarErro(5);
        break;
      default:
          this.usuarioService.verificarCadastro(usuario).subscribe(resultado => {
            if(resultado){
              sessionStorage.setItem('toast','6');
              this.voltar();
            }else{
              this.mostrarErro(8);
            }
          });
        break;

    }
  }

  mostrarErro(erro){
    if(erro==7){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Senhas não coincidem.'});
    }
    else if(erro==1){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'O nome não pode ser nulo!'});
    }
    else if(erro==2){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'O email não pode ser nulo!'});
    }
    else if(erro==3){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'A siape não pode ser nulo!'});
    }
    else if(erro==4){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'A senha não pode ser nulo!'});
    }
    else if(erro==5){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'há algum problema com o cadastro deste setor, contate o administrador do sistema.'});
    }
    else if(erro==8){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Esta siape já está sendo utilizada.'});
    }
    else if(erro==9){
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
}