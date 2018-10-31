import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  adm = new Usuario(0, "admin", "1234567", "admin","ADMIN");
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


  verificarUsuario(nome,siape,senha,senha2){
    if(this.verificarCampos(nome,siape,senha,senha2)){

      if(this.getUsuariosPorSiape(siape) == null){

        if(this.verificaSiapeAvancado(siape)){
          alert("Por favor, preencha todos os campos da siape");
        }else{
        this.setUsuario(nome,siape,senha,null);
        return true;
        }

      }else{
        return false;
       // this.msgErroSiape = true;
       // this.siape = null;

      }
    }
  }

  verificarCampos(nome,siape,senha,senha2){
    //Verifica se não há campos vazios ou se as senhas não são iguais
    if(nome != null && siape != null && senha != null && senha2 != null){
      if(senha == senha2){
          return true;
      }else{
        //this.msgErroSenha = true;
        return false;
      }
    }else{
      alert("Existem campos que ainda não foram preenchidos.");
      return false;
    }
  }
  verificaSiapeAvancado(siape){

    for(let i=0;i<siape.length;i++){
      if(siape.charAt(i)=='_'){
        return true;
      }
    }
    return false;

  }
  
}
