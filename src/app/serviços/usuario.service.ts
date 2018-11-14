import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioCollection: AngularFirestoreCollection<Usuario>;
  usuarios: Usuario[];

  constructor(private afs: AngularFirestore) {
    this.usuarioCollection = afs.collection<Usuario>('usuario');
    this.listarTodos().subscribe(userArr => {
      this.usuarios = userArr;
    })

  }

  //FUNÇÕES PARA O BANCO DE DADOS ==>

  cadastrar(nome, siape, senha, idDoSetor){
    let usuario: Usuario = {nome: nome, siape: siape, senha: senha, idDoSetor: idDoSetor};
    this.usuarioCollection.add(usuario).then(resultado => {
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

  /*
  listarPorSiape(siape): Observable<Usuario>{
    let usuario;
    this.listarTodos().subscribe(userArr => {
      for(let i = 0; i < userArr.length; i++){
        if(userArr[i].siape == siape){
          usuario = userArr[i];
        }
      }
    });

    return usuario;
  }
  */

  listarPorSiape(siape){
    this.listarTodos().subscribe(resultado => {
      this.usuarios = resultado;
    })
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].siape == siape){
        return this.usuarios[i];
      }
    }
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
    let usuarioDoc = this.afs.doc('usuario/'+id);
    usuarioDoc.update({idDoSetor: idDoSetor});

  }

  //FUNÇÕES PARA A PARTE DE VERIFICAÇÕES =======>

  verificacaoDeCadastro(nome: string, siape: string, senha: string, senha2: string){
    /*
      0: TUDO OK              1: CAMPOS SEM PREENCHER
      2: NOME INVÁLIDO        3: SIAPE JÁ EM USO
      4: SENHA NÃO BATEM          
    */
   
    let usuario = this.listarPorSiape(siape);

    if(nome == undefined || nome.length <= 0 || siape == undefined || siape.length <= 0 || siape.indexOf("_") >= 0
     || senha == undefined || senha.length <= 0 || senha == undefined || senha2.length <= 0){
      return 1;
    }else if(nome.length < 1 || nome[0] == " "){
      return 2;
    }else if(usuario != null){
      return 3;
    }else if(senha != senha2){
      return 4;
    }else{
      this.cadastrar(nome, siape, senha, null);
      console.log(siape);
      return 0;
    }

  }

  verificacaoDeLogin(siape, senha){
    /*
      0: TUDO OK        1: ADM
      2: CAMPOS SEM PREENCHER   3: USUÁRIO INEXISTENTE
      4: A SIAPE E A SENHA NÃO BATEM    5: USUÁRIO AINDA NÃO POSSUI UM SETOR
    */

    let usuario = this.listarPorSiape(siape);
    
    if(siape == undefined || siape.length <= 0 || siape.indexOf("_") >= 0 || senha == undefined || senha.length <= 0){
      return 2;
    }else if(usuario == null){
      return 3;
    }else if(usuario.senha != senha){
      return 4;
    }else if(usuario.idDoSetor == null){
      return 5;
    }else{
      if(siape == "0000000"){
        return 1;
      }else{
        return 0;
      }
    }
  }
}
