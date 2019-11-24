import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { MessageService } from 'primeng/api';
import { Usuario } from '../models/Usuario';
import { SetorService } from '../serviços/setor.service';
import {SelectItem} from 'primeng/api';

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

  perguntasDeSeguranca: SelectItem[];
  perguntaSelecionada: number = 1;
  respostaDeSeguranca: string;

  texto: string;
  setores: any[];
  resultados: any[];

  constructor(private router: Router, 
    private usuarioService: UsuarioService, 
    private setorService: SetorService, 
    private messageService: MessageService) {
      this.perguntasDeSeguranca = [
        {label: 'Qual o seu filme/série favorito?', value: '1'},
        {label: 'Qual o nome do seu primeiro animal de estimação?', value: '2'},
        {label: 'Qual o nome de solteira de sua mãe?', value: '3'}
      ];
  }

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
      if(this.setores[i].nome == this.texto){
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

    let usuario = new Usuario("", this.nome, this.email, this.siape, this.senha, this.getIdDoSetor(), this.perguntaSelecionada, this.respostaDeSeguranca);

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
}