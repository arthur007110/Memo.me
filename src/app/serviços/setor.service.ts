import { Injectable } from '@angular/core';
import { Setor } from '../models/Setor';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  constructor() { }

  setor = new Setor(0,"Teste");
  setores: Setor[] = [this.setor];

  getSetores(){
    return this.setores;
  }

}
