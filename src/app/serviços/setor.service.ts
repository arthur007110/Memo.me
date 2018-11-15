import { Injectable } from '@angular/core';
import { Setor } from '../models/Setor';
import { UsuarioService } from './usuario.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  setorCollection: AngularFirestoreCollection<Setor>;
  setores: Setor[];
  
  constructor(private afs: AngularFirestore, private usuarioService: UsuarioService) {
    this.setorCollection = afs.collection<Setor>('setores');
    this.listarTodos().subscribe(resultado => {
      this.setores = resultado;
    });
  }

  //FUNÇÕES PARA O BANCO DE DADOS ==>

  cadastrar(nome, usuario){
    let setor: Setor = {nome: nome, usuario: usuario};
    this.setorCollection.add(setor).then(resultado => {
      let setorDoc = this.setorCollection.doc(resultado.id);
      setorDoc.update({id: resultado.id});
      this.usuarioService.atualizaSetorDeUsuario(usuario.id, resultado.id);
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

  /*
  listarPorNome(nome): Observable<Setor>{
    let setor;
    this.listarTodos().subscribe(setorArr => {
      for(let i = 0; i < setorArr.length; i++){
        if(setorArr[i].nome == nome){
          setor = setor[i];
        }
      }
    });

    return setor;
  }
  */

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
      });});
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

  verificacaoDeCadastro(nome, usuario, setores){
    /*
      0: TUDO OK              1: CAMPOS SEM PREENCHER
      2: NOME INVÁLIDO        3: NOME JÁ EM USO
    */

   let setor;
    for(let i = 0; i < setores.length; i++){
      if(setores[i].nome == nome){
        setor = setores[i];
        break;
      }
    }

    if(nome == undefined || nome.length <= 0 || usuario == null){
      return 1;
    }else if(nome[0] == " "){
      return 2;
    }else if(setor != null){
      return 3;
    }else{
      this.cadastrar(nome, usuario);
      return 0;
    }

  }

}
