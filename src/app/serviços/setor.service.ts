import { Injectable } from '@angular/core';
import { Setor } from '../models/Setor';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  
  constructor() { }

  setor = new Setor(0,"Teste",new Usuario("","","","",""));
  setores: Setor[] = [this.setor];

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

  setSetor(nome, usuario){
    let id = this.setores
    let setor = new Setor(this.setores.length+1, nome, usuario);
    this.setores.push(setor);
  }

}
