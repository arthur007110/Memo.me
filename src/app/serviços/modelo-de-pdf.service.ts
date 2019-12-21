import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ModeloPdf } from '../models/ModeloPdf.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloDePdfService {
  modeloDePdfCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) { 
    this.modeloDePdfCollection = afs.collection<any>('modelosDePdf');
  }

  cadastrar(modeloDePdf: ModeloPdf){
    this.modeloDePdfCollection.add(modeloDePdf.toFirebase()).then(resultado => {
      let modeloDePdfDoc = this.modeloDePdfCollection.doc(resultado.id);
      modeloDePdfDoc.update({id: resultado.id});
    });
  }

  alterarModeloPadrao(modeloPadraoAtual, novoModeloPadrao){
    let modeloDoc;
    modeloDoc = this.afs.doc("modelosDePdf/" + modeloPadraoAtual.id);
    modeloDoc.update({padrao: false});
    modeloDoc = this.afs.doc("modelosDePdf/" + novoModeloPadrao.id);
    modeloDoc.update({padrao: true});
  }

  listarTodos(): Observable<any[]>{
    let resultados: any[] = [];
    let meuObservable = new Observable<any[]>(observer => {
      this.modeloDePdfCollection.snapshotChanges().subscribe(result => {
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

  getModeloPadraoAtual(): Observable<any[]>{
    console.log("5");
    let meuObservable = new Observable<any>(observer => {
      let collectionFiltrada = this.afs.collection<any>('modelosDePdf',  ref => ref.where('padrao', '==', true));
      let resultado = collectionFiltrada.valueChanges();
      resultado.subscribe(resultado=>{
        observer.next(resultado);
        observer.complete();
      });
    });

    return meuObservable;
  }

  listarPorNome(nome){
    let modelos = this.afs.collection<any>('modelosDePdf', ref=>ref.where('nome', '==', nome));
    return modelos.valueChanges();
  }

  verificarSeExisteONome(nome): Observable<any>{
    let meuObservable = new Observable<any>(observer => {
      this.listarPorNome(nome).subscribe(resultado => {
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
