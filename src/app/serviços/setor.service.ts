import { Injectable } from '@angular/core';
import { Setor } from '../models/Setor';
import { UsuarioService } from './usuario.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  setorCollection: AngularFirestoreCollection<any>;
  setores: Setor[];
  
  constructor(private afs: AngularFirestore, private usuarioService: UsuarioService) {
    this.setorCollection = afs.collection<any>('setores');
  }

  cadastrar(setor: Setor): Observable<any>{
    let meuObservable = new Observable<any>(observer => {
      this.verificarSeExisteONome(setor).subscribe(resultado => {
        if(resultado){
          observer.next(false); //Nome já existe. Falha no cadastro.
        }else{
          this.setorCollection.add(setor.toFirebase()).then(resultado => {
            let setorDoc = this.setorCollection.doc(resultado.id);
            setorDoc.update({id: resultado.id});
            this.usuarioService.atualizaSetorDeUsuario(setor.getIdDoUsuario(), resultado.id);
          });
          observer.next(true); //Cadastro realizado com sucesso.
        }
        observer.complete();
      })
    })

    return meuObservable;
  }

  atualizar(setor): Observable<any>{
    let meuObservable = new Observable<any>(observer => {
      this.verificarSeExisteONome(setor).subscribe(resultado => {
        if(resultado){
          observer.next(false); //Nome já existe. Falha ao atualizar.
        }else{
          let setorDoc = this.afs.doc('setores/' + setor.getId());
          setorDoc.update({nome: setor.getNome()});
          observer.next(true); //Atualização realizada com sucesso.
        }
        observer.complete();
      })
    })

    return meuObservable;
  }

  listarPorId(id){
    return new Observable(observer => {
      let doc = this.setorCollection.doc(id);
      doc.snapshotChanges().subscribe(result => {
        let id = result.payload.id;
        let data = result.payload.data();
        let document = {id: id, ...data};
        observer.next(document);
        observer.complete();
      });
    });
  }

  listarPorNome(nome){
    let setores = this.afs.collection<any>('setores', ref=>ref.where('nome', '==', nome));
    return setores.valueChanges();
  }
  
  listarTodos(): Observable<any[]>{
    let resultados: any[] = [];
    let meuObservable = new Observable<any[]>(observer => {
      this.setorCollection.snapshotChanges().subscribe(result => {
        result.map(documents => {
          let id = documents.payload.newIndex;
          let data = documents.payload.doc.data();
          let document = {id: id, ...data};
          resultados.push(document);
        });
        observer.next(resultados);
        observer.complete();
      });
    });
      return meuObservable;
  }

  verificarSeExisteONome(setor): Observable<any>{
    let meuObservable = new Observable<any>(observer => {
      this.listarPorNome(setor.getNome()).subscribe(resultado => {
        if(resultado.length > 0){
          observer.next(true);
        }else{
          observer.next(false);
        }
        observer.complete();
      })
    })

    return meuObservable;
  }

}
