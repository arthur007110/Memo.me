export class Setor{

    id?: string;
    nome: string;
    idDoUsuario?: string;

    constructor(id, nome, idDoUsuario){
        this.id = id;
        this.nome = nome;
        this.idDoUsuario = idDoUsuario;
    }

    toFirebase(){
        return {id: "", nome: this.nome, idDoUsuario: this.idDoUsuario};
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
    getIdDoUsuario(){
        return this.idDoUsuario;
    }
    setIdDoUsuario(idDoUsuario){
        this.idDoUsuario = idDoUsuario;
    }
}