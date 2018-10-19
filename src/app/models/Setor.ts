import { Usuario } from "./Usuario";

export class Setor{

    id:number;
    nome:String;
    usuarios:Usuario[];

    constructor(id, nome){
        this.id = id;
        this.nome = nome;
    }

    getId(){
        return this.id;
    }
    setId(id){
        this.id=id;
    }
    getNome(){
        return this.nome;
    }
    setNome(nome){
        this.nome=nome;
    }


}