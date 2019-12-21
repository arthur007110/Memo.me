import { Component, OnInit } from '@angular/core';
import { ModeloPdf } from '../models/ModeloPdf.js';
import { DialogService, MessageService } from 'primeng/api';
import { ModeloDePdfService } from '../serviços/modelo-de-pdf.service.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-cadastrar-modelo-de-memorando',
  templateUrl: './cadastrar-modelo-de-memorando.component.html',
  styleUrls: ['./cadastrar-modelo-de-memorando.component.css'],
  providers: [ DialogService, MessageService ]
})
export class CadastrarModeloDeMemorandoComponent implements OnInit {
  nomeDoModelo: string = "";
  imagem;
  texto: string = ".";
  fonte: number = null;
  urlDaImagem: string = null;
  imageWidth: number = 0;
  imageHeight: number = 0;
  imagePositionX: number = 0;
  imagePositionY: number = 0;
  contemImagem: boolean = false;
  display: boolean = false;
  //conteudo: any[] = [];

  constructor(public dialogService: DialogService, public messageService: MessageService, private modeloDePdf: ModeloDePdfService) { }

  ngOnInit() {
  }

  salvar(){
    let modelo: ModeloPdf;
    if(this.contemImagem && this.urlDaImagem != "" && this.urlDaImagem != undefined){
      modelo = new ModeloPdf(this.nomeDoModelo, this.texto, this.fonte, this.urlDaImagem, this.imageWidth, this.imageHeight, this.imagePositionX, this.imagePositionY);
    }else{
      modelo = new ModeloPdf(this.nomeDoModelo, this.texto, this.fonte, null, null, null, null, null);
    }

    if(modelo.verificarCampos() == 3){
      this.modeloDePdf.verificarSeExisteONome(modelo.nome).subscribe(resultado => {
        if(resultado){
          this.mostrarErro(3);
        }else{
          this.modeloDePdf.cadastrar(modelo);
          this.mostrarMensagem();
        }
      });
    }else if(modelo.verificarCampos() == 1){
      this.mostrarErro(1);
    }else{
      this.mostrarErro(2);
    }
  }

  addImagem(){
    this.imageWidth = this.imageHeight = this.imagePositionX = this.imagePositionY = null;
    this.contemImagem = !this.contemImagem;
  }

  vizualizar(){
    let textoFinal = "";

    for(let i = 0; i < this.texto.length; ++i){
      textoFinal = textoFinal.replace(". ", "\0");
      textoFinal += this.texto[i];
    }

    if(this.contemImagem && this.urlDaImagem != "" && this.urlDaImagem != undefined){
      const documentDefinition = {
        content: [
          {text: textoFinal, fontSize: this.fonte},
          {
            image: this.urlDaImagem,
            width: this.imageWidth,
            height: this.imageHeight,
            absolutePosition: { x: this.imagePositionX, y: this.imagePositionY }
          }
        ]
      };
      pdfMake.createPdf(documentDefinition).open();

    }else{
      const documentDefinition = {
        content: {text: textoFinal, fontSize: this.fonte}
      };
      pdfMake.createPdf(documentDefinition).open();
    }

  }

  mostrarMensagem(){
    this.messageService.add({severity:'success', summary: 'Cadastrado!', detail:'Modelo Cadastrado.'});
    this.nomeDoModelo = this.texto = this.fonte = this.imageWidth = this.imageHeight = this.imagePositionX = this.imagePositionY = null;
    this.contemImagem = false;
  }
  mostrarAjuda(){
    this.display = true;
  }

  mostrarErro(erro){
    if(erro == 1){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Tentantiva de salvar um modelo sem informação alguma.'});
    }else if(erro == 2){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Adicione um nome ao memorando.'});
    }else{
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Já existe um modelo com esse nome.'});
    }
  }
}
