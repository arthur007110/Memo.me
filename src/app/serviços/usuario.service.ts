import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  adm = new Usuario(0, "admin", "0000000", "admin","ADMIN");
  //user = new Usuario(1, "a", "1234566", "a",null);
  //user2 = new Usuario(3, "a", "2234566", "a",null);
  //user3 = new Usuario(4, "a", "3234566", "a",null);
  //user4 = new Usuario(5, "a", "4234566", "a",null);
  //user5 = new Usuario(6, "a", "5234566", "a",null);
  //usuarios: Usuario[] = [this.adm, this.user];
  usuarios: Usuario[] = [this.adm];
  

  constructor() { }

  getUsuarios(){
    return this.usuarios;
  }

  getUsuarioPorId(id): Usuario{
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].getID() == id){
        return this.usuarios[i];
      }
    }
  }

  getUsuarioPorNome(nome): Usuario{
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].getNome() == nome){
        return this.usuarios[i];
      }
    }
  }

  getUsuariosPorSiape(siape): Usuario{
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].getSiape() == siape){
        return this.usuarios[i];
      }
    }

    return null;
  }

  setUsuario(nome, siape, senha, setor){
    //Obtém um id para o usuário
    let id = this.usuarios.length;
    //Salva usuário no array
    this.usuarios.push(new Usuario(id, nome, siape, senha, setor));
  }

  atualizaSetorDeUsuario(id, idDoSetor){
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].getID() == id){
        this.usuarios[i].setsetor(idDoSetor);
      }
    }
  }

  //FUNÇÕES PARA A PARTE DE VERIFICAÇÕES =======>

  verificacaoDeCadastro(nome: string, siape: string, senha: string, senha2: string){
    /*
      0: TUDO OK              1: CAMPOS SEM PREENCHER
      2: NOME INVÁLIDO        3: SIAPE JÁ EM USO
      4: SENHA NÃO BATEM          
    */

    if(nome == undefined || nome.length <= 0 || siape == undefined || siape.length <= 0 || siape.indexOf("_") >= 0
     || senha == undefined || senha.length <= 0 || senha == undefined || senha2.length <= 0){
      return 1;
    }else if(nome.length < 1 || nome[0] == " "){
      return 2;
    }else if(this.getUsuariosPorSiape(siape) != null){
      return 3;
    }else if(senha != senha2){
      return 4;
    }else{
      this.setUsuario(nome, siape, senha, null);
      console.log(siape);
      return 0;
    }

  }

  verificacaoDeLogin(siape, senha){
    /*
      0: TUDO OK        1: ADM
      2: CAMPOS SEM PREENCHER   3: USUÁRIO INEXISTENTE
      4: A SIAPE E A SENHA NÃO BATEM    5: USUÁRIO AINDA NÃO POSSUI UM SETOR
    */

    let usuario = this.getUsuariosPorSiape(siape);

    if(siape == undefined || siape.length <= 0 || siape.indexOf("_") >= 0 || senha == undefined || senha.length <= 0){
      return 2;
    }else if(usuario == null){
      return 3;
    }else if(usuario.getSenha() != senha){
      return 4;
    }else if(usuario.getsetor() == null){
      return 5;
    }else{
      if(siape == "0000000"){
        return 1;
      }else{
        return 0;
      }
    }
  }
}
