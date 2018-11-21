import { Injectable } from '@angular/core';
import { Memorando } from '../models/Memorando';
import { SetorService } from './setor.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MemorandoService {

  constructor(private setorService: SetorService, private usuarioService: UsuarioService) { }

  //memorando = new Memorando("teste",12345,12355,"20-10-2018");
  //memorandos:Memorando[] = [this.memorando];
  memorandos:Memorando[] = [];

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

  //FUNÇÕES PARA A PARTE DE VERIFICAÇÕES =======>

  verificacaoEnviarMemorando(setorDeDestino, usuario, mensagem){
    /*
    0: TUDO OK              1: CAMPOS SEM PREENCHER
    */

    if(setorDeDestino == null || usuario == null || mensagem == null || mensagem.length <= 0){
      return 1;
    }else{
      let now = new Date();
      let data = now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear();
      let setorEmissor = usuario.idDoSetor;
      let memorando = new Memorando(mensagem, setorEmissor, setorDeDestino.id, data);
      this.setMemorando(memorando);
      return 0;
    }
  }
}
