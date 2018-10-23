import { Injectable } from '@angular/core';
import { Memorando } from '../models/Memorando';

@Injectable({
  providedIn: 'root'
})
export class MemorandoService {

  constructor() { }

  //memorando = new Memorando("teste",12345,12355,"20-10-2018");
  //memorandos:Memorando[] = [this.memorando];
  memorandos:Memorando[]=[];

  public getMemorandos(){
    return this.memorandos;
  }

  setMemorando(memorando:Memorando){
    //Obtém um id para o memorando
    let id = ""+this.memorandos.length;
    memorando.setId(id);
    //Salva memorando no array
    this.memorandos.push(memorando);
  }
  getMemorandoPorId(id){
    for(let i = 0; i < this.memorandos.length; i++){
      if(this.memorandos[i].getId() == id){
        return this.memorandos[i];
      }
    }
  }
  getMemorandosRecebidosSetor(idSetor){

    let requesicao:Memorando[]=[];
    for(let i = 0; i < this.memorandos.length; i++){
      if(this.memorandos[i].getsetorDestinatario() == idSetor){
       requesicao.push(this.memorandos[i]);
      }
    }
    return requesicao;
  }
  getMemorandosEnviadosSetor(idSetor){

    let requesicao:Memorando[]=[];
    for(let i = 0; i < this.memorandos.length; i++){
      if(this.memorandos[i].getsetorEmissor() == idSetor){
       requesicao.push(this.memorandos[i]);
      }
    }
    return requesicao;
  }
}
