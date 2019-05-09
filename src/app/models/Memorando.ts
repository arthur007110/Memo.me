export class Memorando{

    private id?: string;
    private visto:boolean;
    private mensagem:string;
    private dataEnvio:string;
    private idSetorEmissor?:string;
    private idSetorDestinatario?:string;
    //private nomeSetorEmissor:string;
    
    constructor(id, mensagem,idSetorEmissor,idSetorDestinatario,dataEnvio){
        this.id = id;
        this.mensagem=mensagem;
        this.dataEnvio=dataEnvio;
        this.idSetorEmissor=idSetorEmissor;
        this.idSetorDestinatario=idSetorDestinatario;
        this.visto = false;
    }

    toFireBase(){
        return{id: "", mensagem: this.mensagem, idSetorEmissor: this.idSetorEmissor, 
            idSetorDestinatario: this.idSetorDestinatario, dataEnvio: this.dataEnvio, visto: this.visto};
    }
    
    public getId() : string {
        return this.id;
    }

    public setId(id : string) {
        this.id = id;
    }
  
    public getMensagem() : string {
        return this.mensagem;
    }
    public setMensagem(mensagem : string) {
        this.mensagem = mensagem;
    }
    
    public getDataEnvio() : string {
        return this.dataEnvio;
    }
    public setDataEnvio(dataEnvio : string) {
        this.dataEnvio = dataEnvio;
    }
    
    public getSetorEmissor() : string {
        return this.idSetorEmissor;
    }
    public setSetorEmissor(setorEmissor : string) {
        this.idSetorEmissor = setorEmissor;
    }

    public getSetorDestinatario() : string {
        return this.idSetorDestinatario;
    }
    public setSetorDestinatario(setorDestinatario : string) {
        this.idSetorDestinatario = setorDestinatario;
    }

    public marcarComoVisto(){
        this.visto=true;
    }
}