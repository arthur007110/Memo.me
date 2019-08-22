export class Memorando{
    private id?: string;
    private usuariosQueVizualizaram: string[];
    private mensagem:string;
    private assunto:string;
    private dataEnvio:string;
    private numeroDoMemorando: string;
    private idSetorEmissor?:string;
    private idSetorDestinatario?:string;
    private idDoUsuarioEmissor: string;
    
    constructor(id, mensagem, assunto, idSetorEmissor,idSetorDestinatario, idDoUsuarioEmissor, dataEnvio){
        this.id = id;
        this.mensagem=mensagem;
        this.assunto = assunto;
        this.dataEnvio=dataEnvio;
        this.numeroDoMemorando = null;
        this.idSetorEmissor=idSetorEmissor;
        this.idSetorDestinatario=idSetorDestinatario;
        this.idDoUsuarioEmissor = idDoUsuarioEmissor;
        this.usuariosQueVizualizaram = [];
    }

    toFireBase(){
        return{id: "", mensagem: this.mensagem, idSetorEmissor: this.idSetorEmissor,
            idSetorDestinatario: this.idSetorDestinatario, idDoUsuarioEmissor: this.idDoUsuarioEmissor, 
            dataEnvio: this.dataEnvio, usuariosQueVizualizaram: this.usuariosQueVizualizaram, 
            numeroDoMemorando: this.numeroDoMemorando, assunto: this.assunto};
    }

    public getUsuariosQueVizualizaram(): string[]{
        return this.usuariosQueVizualizaram;
    }

    public setUsuariosQueVizualizaram(siapesDosUsuarios: string[]){
        this.usuariosQueVizualizaram = siapesDosUsuarios;
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

    public getAssunto(): string{
        return this.assunto;
    }
    public setAssunto(assunto: string){
        this.assunto = assunto;
    }
    
    public getDataEnvio() : string {
        return this.dataEnvio;
    }
    public setDataEnvio(dataEnvio : string) {
        this.dataEnvio = dataEnvio;
    }

    public getNumeroDoMemorando(): string{
        return this.numeroDoMemorando;
    }
    public setNumeroDoMemorando(numeroDoMemorando: string){
        this.numeroDoMemorando = numeroDoMemorando;
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

    public getIdDoUsuarioEmissor(): string{
        return this.idDoUsuarioEmissor;
    }
    public setIdDoUsuarioEmissor(idDoUsuarioEmissor: string){
        this.idDoUsuarioEmissor = idDoUsuarioEmissor;
    }
}