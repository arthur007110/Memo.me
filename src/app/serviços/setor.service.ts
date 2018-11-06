import { Injectable } from '@angular/core';
import { Setor } from '../models/Setor';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  
  constructor(private usuarioService: UsuarioService) { }

  //setor = new Setor(0,"Teste",new Usuario("","","","",""));
  //setores: Setor[] = [this.setor];
  setores: Setor[] = [];

  atualizarSetor(id, novoNome){
    for(let i = 0; i < this.setores.length; i++){
      if(this.setores[i].id == id){
        this.setores[i].setNome(novoNome);
        return;
      }
    }
  }

  getSetores(){
    return this.setores;
  }
  
  getSetorPorNome(nome){
    for(let i = 0; i < this.setores.length; i++){
      if(this.setores[i].nome == nome){
        return this.setores[i];
      }
    }
  }

  getSetorPorId(id){
    for(let i = 0; i < this.setores.length; i++){
      if(this.setores[i].id == id){
        return this.setores[i];
      }
    }
  }

  setSetor(nome: string, usuario: Usuario){
    let id = this.setores.length;
    let setor = new Setor(id, nome, usuario);
    this.setores.push(setor);

    //Atualiza as informações do usuário quanto ao setor.
    this.usuarioService.atualizaSetorDeUsuario(usuario.getID(), id);

  }

  //FUNÇÕES PARA A PARTE DE VERIFICAÇÕES =======>

  verificacaoDeAtualizar(nome, novoNome){
    /*
      0: TUDO OK              1: CAMPOS SEM PREENCHER
      2: NOME INVÁLIDO        3: NOME JÁ EM USO
    */

    if(novoNome == undefined || novoNome.length <= 0){
      return 1;
    }else if(novoNome[0] == " "){
      return 2;
    }else if(nome != novoNome && this.getSetorPorNome(novoNome) != null){
      return 3;
    }else{
      this.atualizarSetor(this.getSetorPorNome(nome).id, novoNome);
      return 0;
    }
  }

  verificacaoDeCadastro(nome, usuario){
    /*
      0: TUDO OK              1: CAMPOS SEM PREENCHER
      2: NOME INVÁLIDO        3: NOME JÁ EM USO
    */

    if(nome == undefined || nome.length <= 0 || usuario == null){
      return 1;
    }else if(nome[0] == " "){
      return 2;
    }else if(this.getSetorPorNome(nome) != null){
      return 3;
    }else{
      this.setSetor(nome, usuario);
      return 0;
    }

  }

}
