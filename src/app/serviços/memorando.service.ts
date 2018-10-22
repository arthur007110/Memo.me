import { Injectable } from '@angular/core';
import { Memorando } from '../models/Memorando';

@Injectable({
  providedIn: 'root'
})
export class MemorandoService {

  constructor() { }

  memorando = new Memorando("teste",12345,12355,"20-10-2018");
  memorandos:Memorando[] = [this.memorando,this.memorando,this.memorando,this.memorando];

  public getMemorandos(){
    return this.memorandos;
  }

  setMemorando(memorando:Memorando){
    //Obtém um id para o memorando
    let id = this.memorandos.length;
    //Salva memorando no array
    this.memorandos.push(memorando);
  }

}
