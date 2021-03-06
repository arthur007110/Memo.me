import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.usuarioCollection = afs.collection<any>('usuarios');
  }

  //FUNÇÕES PARA O BANCO DE DADOS ==>
  cadastrar(usuario: Usuario){
    this.usuarioCollection.add(usuario.toFireBase()).then(resultado => {
      let userDoc = this.usuarioCollection.doc(resultado.id);
      userDoc.update({id: resultado.id});
    });
  }

  listarPorId(id){
    return new Observable(observer => {
      let doc = this.usuarioCollection.doc(id);
      doc.snapshotChanges().subscribe(result => {
        let id = result.payload.id;
        let data = result.payload.data();
        let document = {id: id, ...data};
        observer.next(document);
        observer.complete();
      })
    })
  }

  listarPorSetor(idDoSetor): Observable<any[]>{
    let meuObservable = new Observable<any>(observer=>{
      let collectionFiltrada = this.afs.collection<any>('usuarios', ref=>ref.where('idDoSetor', '==', idDoSetor));
      let resultado = collectionFiltrada.valueChanges();
      resultado.subscribe(userArr => {
        observer.next(userArr);
        observer.complete();
      });
    });
    return meuObservable;
  }

  listarTodos(): Observable<any[]>{
    let resultados: any[] = [];
    let meuObservable = new Observable<any[]>(observer => {
      this.usuarioCollection.snapshotChanges().subscribe(result => {
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

  atualizaSetorDeUsuario(id, idDoSetor){
    let usuarioDoc = this.afs.doc('usuarios/'+id);
    usuarioDoc.update({idDoSetor: idDoSetor});
  }

  criptografar(texto){
    const md5 = new Md5();
    return md5.appendStr(texto).end();
  }

  //FUNÇÕES PARA A PARTE DE VERIFICAÇÕES =======>
  verificarCadastro(usuario): Observable<any>{
    let meuObservable = new Observable<any>(observer => {
      let collectionFiltrada = this.afs.collection<any>('usuarios', ref=>ref.where('siape', '==', usuario.getSiape()));
      let resultado = collectionFiltrada.valueChanges();
      resultado.subscribe(userArr => {
        if(userArr.length == 0){
          usuario.setSenha(this.criptografar(usuario.getSenha()));
          this.cadastrar(usuario);
          observer.next(true);
        }else{
          observer.next(false);
        }
        observer.complete();
      });
    });
    return meuObservable;
  }

  verificarLogin(siape, senha): Observable<any>{
    let meuObservable = new Observable<any>(observer => {
      if(siape == null || senha == null || siape.indexOf('_') != -1){
        observer.next(false);
        observer.complete();
      }

      senha = this.criptografar(senha);

      let collectionFiltrada = this.afs.collection<any>('usuarios', 
      ref => ref.where('siape', '==', siape).where('senha', '==', senha));
      let resultado = collectionFiltrada.valueChanges();
      resultado.subscribe(userArr=>{
        if(userArr.length == 0){
          observer.next(3);
        }else if(userArr[0].idDoSetor == null && siape != "0000000"){
          observer.next(1);
        }else if(siape != "0000000" && userArr[0].perguntaDeSeguranca == null){
          observer.next(4)
        }else{
          observer.next(2);
        }
        observer.complete();
      });
    });

    return meuObservable;
  }

  loginComPerguntaDeSeguranca(siape, perguntaDeSeguranca, respostaDeSeguranca): Observable<any>{
    let rds = this.criptografar(respostaDeSeguranca);
    let meuObservable = new Observable<any>(observer => {
      let collectionFiltrada = this.afs.collection<any>('usuarios', 
      ref => ref.where('siape', '==', siape).where('perguntaDeSeguranca', '==', perguntaDeSeguranca).where('respostaDeSeguranca', '==', rds));
      let resultado = collectionFiltrada.valueChanges();
      resultado.subscribe(userArr=>{
        if(userArr.length == 0){
          observer.next(3);
        }else{
          observer.next(2);
        }
        observer.complete();
      });
    });
    return meuObservable;
  }

  atualizarSenhaDoUsuario(id, novaSenha, novaPDS, novaRDS){
    let ns = this.criptografar(novaSenha);
    let rds = this.criptografar(novaRDS);
    let usuarioDoc = this.afs.doc('usuarios/'+id);
    usuarioDoc.update({senha: ns, perguntaDeSeguranca: novaPDS, respostaDeSeguranca: rds});
  }

  cadastrarPDS(idDoUsuario, perguntaDeSeguranca, respostaDeSeguranca){
    let rds = this.criptografar(respostaDeSeguranca);
    let usuarioDoc = this.afs.doc('usuarios/'+idDoUsuario);
    usuarioDoc.update({perguntaDeSeguranca: perguntaDeSeguranca, respostaDeSeguranca: rds});
  }
}
