export class ModeloPdf{
    id: string;
    padrao: boolean;
    nome: string;
    texto: string;
    fonte: number;
    urlDaImagem: string;
    imageWidth: number;
    imageHeight: number;
    imagePositionX: number;
    imagePositionY: number;

    constructor(nome, texto, fonte, urlDaImagem, imageWidth, imageHeight, imagePositionX, imagePositionY){
        this.id = "";
        this.padrao = false;
        this.nome = nome;
        this.texto = texto;
        this.fonte = fonte;
        this.urlDaImagem = urlDaImagem;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.imagePositionX = imagePositionX;
        this.imagePositionY = imagePositionY;
    }

    toFirebase(){
        return {id: "", padrao: false, nome: this.nome, texto: this.texto, fonte: this.fonte, urlDaImagem: this.urlDaImagem, imageWidth: this.imageWidth, imageHeight: this.imageHeight, imagePositionX: this.imagePositionX, imagePositionY: this.imagePositionY}
    }

    verificarCampos(){

        if((this.texto == undefined || this.texto == null || this.texto.length <= 1) && (this.urlDaImagem == undefined ||  this.urlDaImagem == null || this.urlDaImagem.length == 0)){
            return 1;
        }else if(this.nome == undefined || this.nome == null || this.nome.length == 0){
            return 2;
        }else{
            return 3;
        }
    }

    public getImagem(): any{
        return {
            image: this.urlDaImagem,
            width: this.imageWidth,
            height: this.imageHeight,
            absolutePosition: { x: this.imagePositionX, y: this.imagePositionY}
        }
    }

    public getTexto(): string{
        return this.texto;
    }

    public getConteudo(): any{
        return {content: [
            {text: this.texto},
            {
                image: this.urlDaImagem,
                width: this.imageWidth,
                height: this.imageHeight,
                absolutePosition: { x: this.imagePositionX, y: this.imagePositionY}
            }
        ]};
    }
}