import { Injectable} from '@angular/core';
import { UsuarioService } from './usuario.service';
import { SetorService } from './setor.service'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ModeloDePdfService } from './modelo-de-pdf.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService{

  constructor(private usuarioService: UsuarioService, private setorService: SetorService, private modeloDePdfService: ModeloDePdfService){ }

  gerarPdf(memorando: any){
    let usuario, setorEmissor, setorDestino;
    this.usuarioService.listarPorId(memorando.idDoUsuarioEmissor).subscribe(usuarioR => {
      usuario = usuarioR;
    });
    this.setorService.listarPorId(memorando.idSetorEmissor).subscribe(setorER => {
      setorEmissor = setorER;
    });
    this.setorService.listarPorId(memorando.idSetorDestinatario).subscribe(setorDR=> {
      setorDestino = setorDR;
    });
    this.modeloDePdfService.getModeloPadraoAtual().subscribe(modeloR => {
      this.organizarOPdf(modeloR[0], memorando, usuario, setorEmissor, setorDestino);
    });
  }

  organizarOPdf(modelo: any, memorando: any, usuario: any, setorEmissor: any, setorDestino: any){
    let textoOriginal = modelo.texto;
    let textoFinal = "";

    for(let i = 0; i < textoOriginal.length; i++){
      textoFinal = textoFinal.replace("&& ", "\0");
      textoFinal += textoOriginal[i];
    }

    for(let j = 0; j < textoFinal.length; j++){
      textoFinal = textoFinal.replace("&MENSAGEM", memorando.mensagem);
      textoFinal = textoFinal.replace("&ASSUNTO", memorando.assunto);
      textoFinal = textoFinal.replace("&DATA", memorando.dataEnvio);
      textoFinal = textoFinal.replace("&NUMERO", memorando.numeroDoMemorando);
      textoFinal = textoFinal.replace("&NOME", usuario.nome);
      textoFinal = textoFinal.replace("&SIAPE", usuario.siape);
      textoFinal = textoFinal.replace("&SETOREMISSOR", setorEmissor.nome);
      textoFinal = textoFinal.replace("&SETORDESTINO", setorDestino.nome);
    }

    for(let i = 0; i < textoOriginal.length; i++){
      textoFinal = textoFinal.replace("&&", "\0");
    }

    if(modelo.urlDaImagem == null || modelo.urlDaImagem == undefined){
      const documentDefinition = { content: textoFinal, fontSize: modelo.fonte};
      pdfMake.createPdf(documentDefinition).open();
    }else{
      const documentDefinition = {
        content: [
          {text: textoFinal, fontSize: modelo.fonte},
          {
            image: modelo.urlDaImagem,
            width: modelo.imageWidth,
            height: modelo.imageHeight,
            absolutePosition: { x: modelo.imagePositionX, y: modelo.imagePositionY }
          }
        ]
      };
      pdfMake.createPdf(documentDefinition).open();
    }
  }
}