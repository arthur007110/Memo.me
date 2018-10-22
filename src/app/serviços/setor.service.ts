import { Injectable } from '@angular/core';
import { Setor } from '../models/Setor';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  
  constructor() { }

  //setor = new Setor(0,"Teste");
  setores: Setor[] = [];

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
  setSetor(nome, usuario){
    let setor = new Setor(this.setores.length, nome, usuario);
    this.setores.push(setor);
  }

}
