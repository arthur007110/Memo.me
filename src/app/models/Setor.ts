import { Usuario } from "./Usuario";

export interface Setor{

    id?: string;
    nome: string;
    usuario: Usuario;

    /*
    constructor(id, nome, usuario){
        this.id = id;
        this.nome = nome;
        this.usuario = usuario;
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
    getUsuario(){
        return this.usuario;
    }
    setUsuario(usuario){
        this.usuario = usuario;
    }
    */
}