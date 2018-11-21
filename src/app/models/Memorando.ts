export interface Memorando{
    id?: string;
    visto:boolean;
    mensagem:string;
    dataEnvio:string;
    idSetorEmissor?:string;
    idSetorDestinatario?:string;
    //nomeSetorEmissor:string;
    
    /*
    constructor(mensagem,idSetorEmissor,idSetorDestinatario,dataEnvio){
        this.mensagem=mensagem;
        this.dataEnvio=dataEnvio;
        this.idSetorEmissor=idSetorEmissor;
        this.idSetorDestinatario=idSetorDestinatario;
    }
    
    public getId() : string {
        return this.id;
    }

    public setId(id : string) {
        this.id = id;
    }
  
    public getmensagem() : string {
        return this.mensagem;
    }
    public setmensagem(mensagem : string) {
        this.mensagem = mensagem;
    }
    
    public getdataEnvio() : string {
        return this.dataEnvio;
    }
    public setdataEnvio(dataEnvio : string) {
        this.dataEnvio = dataEnvio;
    }
    
    public getsetorEmissor() : string {
        return this.idSetorEmissor;
    }
    public setsetorEmissor(setorEmissor : string) {
        this.idSetorEmissor = setorEmissor;
    }

    public getsetorDestinatario() : string {
        return this.idSetorDestinatario;
    }
    public setsetorDestinatario(setorDestinatario : string) {
        this.idSetorDestinatario = setorDestinatario;
    }
    public getNomeSetorEmissor(){
        return this.nomeSetorEmissor;
    }
    public setNomeSetorEmissor(nomeSetorEmissor){
        this.nomeSetorEmissor=nomeSetorEmissor;
    }
    public marcarComoVisto(){
        this.visto=true;
    }
    */
}