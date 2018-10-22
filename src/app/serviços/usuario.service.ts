import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario = new Usuario(0, "admin", "1234567", "admin","12345");
  usuarios: Usuario[] = [this.usuario];
  

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
}
