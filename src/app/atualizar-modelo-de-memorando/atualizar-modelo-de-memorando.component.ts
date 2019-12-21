import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ModeloDePdfService } from '../serviços/modelo-de-pdf.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-atualizar-modelo-de-memorando',
  templateUrl: './atualizar-modelo-de-memorando.component.html',
  styleUrls: ['./atualizar-modelo-de-memorando.component.css'],
  providers: [ MessageService ]
})
export class AtualizarModeloDeMemorandoComponent implements OnInit {
  modelos: any[] = [];
  modeloSelecionado: any = {nome: null};
  modeloPadraoAtual: any = {nome: null};

  constructor(public messagemService: MessageService, private router: Router, private modelosService: ModeloDePdfService) { }

  ngOnInit() {
    this.getModelos();
  }

  vizualizarModelo(){
    let textoFinal = "";

    for(let i = 0; i < this.modeloSelecionado.texto.length; ++i){
      textoFinal = textoFinal.replace(". ", "\0");
      textoFinal += this.modeloSelecionado.texto[i];
    }

    if(this.modeloSelecionado.urlDaImagem != null){
      const documentDefinition = {
        content: [
          {text: textoFinal, fontSize: this.modeloSelecionado.fonte},
          {
            image: this.modeloSelecionado.urlDaImagem,
            width: this.modeloSelecionado.imageWidth,
            height: this.modeloSelecionado.imageHeight,
            absolutePosition: { x: this.modeloSelecionado.imagePositionX, y: this.modeloSelecionado.imagePositionY }
          }
        ]
      };
      pdfMake.createPdf(documentDefinition).open();

    }else{
      const documentDefinition = {
        content: {text: textoFinal, fontSize: this.modeloSelecionado.fonte}
      };
      pdfMake.createPdf(documentDefinition).open();
    }

  }

  alterarModelo(){
    this.modelosService.alterarModeloPadrao(this.modeloPadraoAtual, this.modeloSelecionado);
    this.voltar();
  }

  voltar(){
    sessionStorage.setItem('toast','16');
    this.router.navigate(['/listar-setores',sessionStorage.getItem('id-usuario')]);
  }

  getModelos(){
    this.modelosService.listarTodos().subscribe(resultado => {
      this.modelos = resultado;
      this.modeloSelecionado = this.modelos[0];
      this.modelos.forEach(modelo => {
        if(modelo.padrao) this.modeloPadraoAtual = modelo;
      });
    });
  }

}
