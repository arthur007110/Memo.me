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
  memorandosCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private setorService: SetorService, private usuarioService: UsuarioService) {
    this.memorandosCollection = afs.collection<any>('memorandos');
  }

  //FUNÇÕES PARA A PARTE DE VERIFICAÇÕES =======>
  verificacaoEnviarMemorando(idSetorDestinatario, usuario, mensagem, assunto){
    //0: TUDO OK              1: CAMPOS SEM PREENCHER

    if(idSetorDestinatario == null || usuario == null || mensagem == null 
      || mensagem.length <= 0 || assunto == null || assunto.length <= 0){
      return 1;
    }else{
      let now = new Date();
      let data = now.getDate() + '/' + (now.getMonth()+1) + '/' + now.getFullYear();
      let setorEmissor = usuario.idDoSetor;
      let memorando = new Memorando("", mensagem, assunto, setorEmissor, idSetorDestinatario, usuario.id, data);
      this.gerarNumeroDeMemorando(memorando);
      return 0;
    }
  }

  gerarNumeroDeMemorando(memorando: Memorando){
    let dataDeEnvio = memorando.getDataEnvio();
    let anoDeEnvio = dataDeEnvio.substring(dataDeEnvio.length-4);

    this.listarTodos().subscribe(memorandosCadastrados => {
      let numeroDoMemorando = 0;
      for(let i = 0; i < memorandosCadastrados.length; i++){
        if(memorandosCadastrados[i].dataEnvio.indexOf(anoDeEnvio) != -1){
          numeroDoMemorando++;
        }
      }

      memorando.setNumeroDoMemorando(++numeroDoMemorando + "/" + anoDeEnvio);
      this.cadastrar(memorando);
    });
  }

  //FUNÇÕES PARA O BANCO DE DADOS ==>
  cadastrar(memorando: Memorando){
    this.memorandosCollection.add(memorando.toFireBase()).then(resultado => {
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

  marcarComoVisto(memorando, idDoUsuario){
    this.usuarioService.listarPorId(idDoUsuario).subscribe(resultado => {
      let user: any = resultado;
      if(memorando.usuariosQueVizualizaram.indexOf(user.siape) == -1){
        memorando.usuariosQueVizualizaram.push(user.siape);
        let memorandoDoc = this.afs.doc('memorandos/' + memorando.id);
        memorandoDoc.update({usuariosQueVizualizaram: memorando.usuariosQueVizualizaram});
      }
    });
  }
}