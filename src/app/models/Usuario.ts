export class Usuario{

    private id: number;
    private nome: string;
    private siape: string;
    private senha: string;
    private idDoSetor: string;

    constructor(id, nome, siape, senha,setor){
        this.id = id;
        this.nome = nome;
        this.siape = siape;
        this.senha = senha;
        this.idDoSetor = setor;
    }

    public getsetor() : string {
        return this.idDoSetor;
    }
    public setsetor(setor : string) {
        this.idDoSetor = setor;
    }
    public getNome(){
        return this.nome;
    }
    public setNome(nome){
        this.nome=nome;
    }
    public getSiape(){
        return this.siape;
    }
    public setSiape(siape){
        this.siape=siape;
    }
    public getID(){
        return this.id;
    }
    public setID(id){
        this.id=id;
    }
    public getSenha(){
        return this.senha;
    }
    public setSenha(senha){
        this.senha=senha;
    }

}