import { Injectable } from '@angular/core';
import { Setor } from '../models/Setor';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  constructor() { }

  setor = new Setor(12345,"Teste");
  setores: Setor[] = [this.setor];

  getSetores(){
    return this.setores;
  }
  getNameById(id){
    for(let i=0;i<this.setores.length;i++){
      if(this.setores[i].getId()==id){
        return this.setores[i].getNome();
      }
    }
  }

}
