//import undefined = require("firebase/empty-import");

export class Usuario{
    private id?: string;
    private nome: string;
    private email: string;
    private siape: string;
    private senha: string;
    private idDoSetor: string;
    private perguntaDeSeguranca: number;
    private respostaDeSeguranca: string;
    
    constructor(id, nome, email, siape, senha,setor){
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.siape = siape;
      this.senha = senha;
      this.idDoSetor = setor;
      this.perguntaDeSeguranca = null;
      this.respostaDeSeguranca = null;
    }

    toFireBase(){
        return{id: "", nome: this.nome, email: this.email, siape: this.siape, senha: this.senha, idDoSetor: this.idDoSetor, perguntaDeSeguranca: this.perguntaDeSeguranca, respostaDeSeguranca: this.respostaDeSeguranca};
    }

    //FUNÇÕES PARA A PARTE DE VERIFICAÇÕES =======>
    verificarCampos(){
        /*if(this.nome != undefined && this.email != undefined && this.siape != undefined && this.senha != undefined && this.idDoSetor != undefined){
            if(this.nome.length <= 0 || this.email.length <= 0 || this.siape.length <= 0 || this.siape.indexOf("_") >= 0  || this.senha.length <= 0 || this.idDoSetor.length <= 0){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }*/
        let nomeVerificacao, emailVerificacao, siapeVerificacao, senhaVerificacao, idDoSetorVerificacao

        if(this.nome == undefined || this.nome == null || this.nome == "" || this.nome == " " || this.nome.length <=0){
            return 1
        }else if(this.email == undefined || this.email == null || this.email == "" || this.email == " " || this.email.length <=0){
            return 2
        }else if(this.siape == undefined || this.siape == null || this.siape == "" || this.siape == " " || this.siape.length <= 0 || this.siape.indexOf("_") >= 0){
            return 3
        }else if(this.senha == undefined || this.senha == null || this.senha == "" || this.senha == " " || this.senha.length <=0){
            return 4
        }else if(this.idDoSetor == undefined || this.idDoSetor == null || this.idDoSetor == "" || this.idDoSetor == " " || this.idDoSetor.length <=0){
            return 5
        }else{
            return 0;
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

    public getEmail(){
        return this.email;
    }

    public setEmail(email){
        this.email = email;
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
    public getPDS(){
        return this.perguntaDeSeguranca;
    }
    public setPDS(perguntaDeSeguranca){
        this.perguntaDeSeguranca = perguntaDeSeguranca;
    }
    public getRDS(){
        return this.respostaDeSeguranca;
    }
    public setRDS(respostaDeSeguranca){
        this.respostaDeSeguranca = respostaDeSeguranca;
    }   
}