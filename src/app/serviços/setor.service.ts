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
    this.listarTodos().subscribe(resultado => {
      this.setores = resultado;
    });
  }

  //FUNÇÕES PARA O BANCO DE DADOS ==>

  cadastrar(setor: Setor){
    this.setorCollection.add(setor.toFirebase()).then(resultado => {
      let setorDoc = this.setorCollection.doc(resultado.id);
      setorDoc.update({id: resultado.id});
      this.usuarioService.atualizaSetorDeUsuario(setor.getIdDoUsuario(), resultado.id);
    });
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
    this.listarTodos().subscribe(resultado => {
      this.setores = resultado;
      for(let i = 0; i < this.setores.length; i++){
        if(this.setores[i].nome == nome){
          return this.setores[i];
        }
      }
    });
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

  atualizarSetor(id, novoNome){
    let setorDoc = this.afs.doc('setores/' + id);
    setorDoc.update({nome: novoNome});
  }

  //FUNÇÕES PARA A PARTE DE VERIFICAÇÕES =======>

  verificacaoDeAtualizar(id, nome, novoNome, setores){
    /*
      0: TUDO OK              1: CAMPOS SEM PREENCHER
      2: NOME INVÁLIDO        3: NOME JÁ EM USO
    */

    let setor;
    for(let i = 0; i < setores.length; i++){
      if(setores[i].nome == novoNome){
        setor = setores[i];
        break;
      }
    }

    if(novoNome == undefined || novoNome.length <= 0){
      return 1;
    }else if(novoNome[0] == " "){
      return 2;
    }else if(nome != novoNome && setor != null){
      console.log("Elif de Atualizar");
      return 3;
    }else{
      this.atualizarSetor(id, novoNome);
      return 0;
    }
  }

  verificarCadastro(setor): Observable<any>{
    let meuObservable = new Observable<any>(observer => {
      let collectionFiltrada = this.afs.collection<any>('setores', ref=>ref.where('nome', '==', setor.getNome()));
      let resultado = collectionFiltrada.valueChanges();
      resultado.subscribe(setorArr => {
        if(setorArr.length == 0){
          this.cadastrar(setor); // Não existe um setor cadastro com aquela nome;
          observer.next(true);
        }else{
          observer.next(false); // Existe um setor cadastro com aquela nome
        }
        observer.complete();
      });
    });
    return meuObservable;
  }

}
