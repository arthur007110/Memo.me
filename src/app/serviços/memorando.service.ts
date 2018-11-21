import { Injectable } from '@angular/core';
import { Memorando } from '../models/Memorando';
import { SetorService } from './setor.service';
import { UsuarioService } from './usuario.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemorandoService {
  memorandosCollection: AngularFirestoreCollection<Memorando>;
  memorandos: Memorando[] = [];

  constructor(private afs: AngularFirestore, private setorService: SetorService, private usuarioService: UsuarioService) {
    this.memorandosCollection = afs.collection<Memorando>('memorandos');
    this.listarTodos().subscribe(resultado => {
      this.memorandos = resultado;
    });
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
      //let memorando = new Memorando(mensagem, setorEmissor, setorDeDestino.id, data);
      let memorando: Memorando = {id: "", mensagem: mensagem, idSetorEmissor: setorEmissor,
        idSetorDestinatario: setorDeDestino.id, dataEnvio: data, visto: false};
      this.cadastrar(memorando);
      return 0;
    }
  }

  //FUNÇÕES PARA O BANCO DE DADOS ==>

  cadastrar(memorando){
    this.memorandosCollection.add(memorando).then(resultado => {
      let memorandoDoc = this.memorandosCollection.doc(resultado.id);
      memorandoDoc.update({id: resultado.id});
    });
  }

  listarPorId(id){
    return new Observable(observer => {
      let doc = this.memorandosCollection.doc(id);
      doc.snapshotChanges().subscribe(result => {
        let id = result.payload.id;
        let data = result.payload.data();
        let document = {id: id, ...data};
        observer.next(document);
        observer.complete();
      });
    });
  }

  listarTodos(): Observable<any[]>{
    let resultados: any[] = [];
    let meuObservable = new Observable<any[]>(observer => {
      this.memorandosCollection.snapshotChanges().subscribe(result => {
        result.map(documents => {
          let id = documents.payload.newIndex;
          let data = documents.payload.doc.data();
          let document = {id: id, ...data};
          resultados.push(document);
        });
        observer.next(resultados);
        observer.complete();
      });});
      return meuObservable;
  }

  getMemorandosRecebidosSetor(idDoSetor, memorandos){
    let memorandosRecebidos: Memorando[] = [];

    for(let i = 0; i < memorandos.length; i++){
      if(memorandos[i].idSetorDestinatario == idDoSetor){
        memorandosRecebidos.push(memorandos[i]);
      }
    }

    return memorandosRecebidos;
  }

  getMemorandosEnviadosSetor(idDoSetor, memorandos){
    let memorandosEnviados: Memorando[] = [];

    for(let i = 0; i < memorandos.length; i++){
      if(memorandos[i].idSetorEmissor == idDoSetor){
        memorandosEnviados.push(memorandos[i]);
      }
    }

    return memorandosEnviados;
  }

  marcarComoVisto(id){
    let memroandoDoc = this.afs.doc('memorandos/' + id);
    memroandoDoc.update({visto: true});
  }
  
}
