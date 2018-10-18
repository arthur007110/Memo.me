export class Usuario{

    private id: number;
    private nome: string;
    private siape: string;
    private senha: string;

    constructor(id, nome, siape, senha){
        this.id = id;
        this.nome = nome;
        this.siape = siape;
        this.senha = senha;
    }

    getNome(){
        return this.nome;
    }
    setNome(nome){
        this.nome=nome;
    }
    getSiape(){
        return this.siape;
    }
    setSiape(siape){
        this.siape=siape;
    }
    getID(){
        return this.id;
    }
    setID(id){
        this.id=id;
    }
    getSenha(){
        return this.senha;
    }
    setSenha(senha){
        this.senha=senha;
    }

}