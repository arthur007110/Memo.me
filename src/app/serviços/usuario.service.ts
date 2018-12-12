import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
    //Faz a encriptação da senha =======>
    usuario.setSenha(usuario.getSenha());
    // <===========
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

  listarUsuariosSemSetor(){
    let collectionFiltrada = this.afs.collection<any>('usuarios', ref=>ref.where('idDoSetor', '==', null));
    return collectionFiltrada.valueChanges();
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

  //FUNÇÕES PARA A PARTE DE VERIFICAÇÕES =======>

  verificarCadastro(usuario): Observable<any>{
    let meuObservable = new Observable<any>(observer => {
      let collectionFiltrada = this.afs.collection<any>('usuarios', ref=>ref.where('siape', '==', usuario.getSiape()));
      let resultado = collectionFiltrada.valueChanges();
      resultado.subscribe(userArr => {
        if(userArr.length == 0){
          this.cadastrar(usuario); // Não existe um usuário cadastro com aquela siape;
          observer.next(true);
        }else{
          observer.next(false); // Existe um usuário cadastro com aquela siape
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
      let collectionFiltrada = this.afs.collection<any>('usuarios', 
      ref => ref.where('siape', '==', siape).where('senha', '==', senha));
      let resultado = collectionFiltrada.valueChanges();
      resultado.subscribe(userArr=>{
        console.log(userArr.length);
        if(userArr.length == 0){
          observer.next(3);
        }else if(userArr[0].idDoSetor == null && siape != "0000000"){
          console.log("UserArr:" + userArr[0]);
          observer.next(1);
        }else{
          observer.next(2);
        }
        observer.complete();
      });
    });

    return meuObservable;
  }
}
