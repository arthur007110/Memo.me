import { Injectable } from '@angular/core';
import { Setor } from '../models/Setor';
import { SSL_OP_ALL } from 'constants';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  
  constructor() { }

  //setor = new Setor(0,"Teste");
  setores: Setor[] //= [this.setor];

  addSetores(setor){
   

  }
  validadeID(setorId:number){
    for(let i=this.setores.length;i>0;i--){
      if(this.setores[i].getId()==setorId){
        return false;
      }
    }
    return true;
    
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
  setSetor(nome, usuario){
    let setor = new Setor(this.setores.length, nome, usuario);
    this.setores.push(setor);
  }
  getNameById(id){
    for(let i=0;i<this.setores.length;i++){
      if(this.setores[i].getId()==id){
        return this.setores[i].getNome();
      }
    }
  }

}
