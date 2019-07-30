export class Usuario{
    private id?: string;
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

    toFireBase(){
        return{id: "", nome: this.nome, siape: this.siape, senha: this.senha, idDoSetor: this.idDoSetor}
    }

    //FUNÇÕES PARA A PARTE DE VERIFICAÇÕES =======>
    verificarCampos(){
        if(this.nome != undefined && this.siape != undefined && this.senha != undefined){
            if(this.nome.length <= 0 || this.siape.length <= 0 || this.siape.indexOf("_") >= 0  || this.senha.length <= 0){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
    }

    public getSetor() : string {
        return this.idDoSetor;
    }

    public setSetor(setor : string) {
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