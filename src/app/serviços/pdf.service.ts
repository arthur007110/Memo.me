import { Injectable} from '@angular/core';
import * as jsPDF from 'jspdf';
import { UsuarioService } from './usuario.service';
import { SetorService } from './setor.service';
import { Setor } from '../models/Setor';

@Injectable({
  providedIn: 'root'
})
export class PdfService{
  setores: Setor[];
  usuarios: any[];

  constructor(private usuarioS: UsuarioService, private setorS: SetorService) {
    this.usuarioS.listarTodos().subscribe(result => {
      this.usuarios = result;
    });
  }

  gerarPdf(memorando){
    this.setorS.listarTodos().subscribe(result => {
      this.setores = result;
      var usuario = this.getUsuario(memorando);
      var nomeDoSetorEmissor = this.getNomeDoSetorEmissor(memorando.idSetorEmissor);
      var nomeDoSetorDeDestino = this.getNomeDoSetorDeDestino(memorando.idSetorDestinatario);

      let documento = new jsPDF();

      documento.setFont("helvetica", "bold");
      documento.setFontSize(12);
      documento.text("SERVIÇO PÚBLICO FEDERAL", 75, 10);
      documento.text("INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DE PERNAMBUCO", 20, 15);
      
      documento.setFontStyle("normal");
      documento.setFontSize(11);
      documento.text("Garanhuns, " + memorando.dataEnvio, 150, 40);

      documento.setFontStyle("bold");
      documento.setFontSize(11);
      documento.text("Memorando N°" + memorando.numeroDoMemorando, 20, 50);

      documento.setFontSize(10);
      documento.text("De: ", 20, 60);
      documento.text("Para: ", 20, 65);
      documento.setFontStyle("normal");
      documento.text(nomeDoSetorEmissor, 26, 60);
      documento.text(nomeDoSetorDeDestino, 29, 65);

      documento.setFontStyle("bold");
      documento.setFontSize(11);
      documento.text("Assunto: ", 20, 80);
      documento.setFontStyle("normal");
      documento.setFontSize(11);
      documento.text(memorando.assunto, 38, 80);
      documento.text(this.organizaOConteudo(memorando.mensagem), 20, 95);

      documento.text("____________________________", 75, 280);
      documento.text(usuario.nome, 100, 285);
      documento.text("SIAPE: " + usuario.siape , 92, 290);

      var string = documento.output('datauristring');
      var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
      var x = window.open();
      x.document.open();
      x.document.write(iframe);
      x.document.close();
    });
  }

  getUsuario(memorando){
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].id == memorando.idDoUsuarioEmissor){
        return this.usuarios[i];
      }
    }
  }

  getNomeDoSetorDeDestino(id){
    for(let i = 0; i < this.setores.length; i++){
      if(this.setores[i].id == id){
        return this.setores[i].nome;
      }
    }
  }

  getNomeDoSetorEmissor(id){
    for(let i = 0; i < this.setores.length; i++){
      if(this.setores[i].id == id){
        return this.setores[i].nome;
      }
    }
  }

  organizaOConteudo(texto: string){
    let textoReformulado = "";
    let quantDeCaracteres = 0;

    for(let i = 0; i < texto.length; i++){
      if(texto[i] == "<" && texto[i+1] == "p"){
        i += 2;
      }else if(texto[i] == "<" && texto[i+1] == "b"){
        i += 3;
      }else if(texto[i] == "<" && texto[i+1] == "/"){
        textoReformulado += "\r\n";
        quantDeCaracteres = 0;
        i += 3;
      }else{
        ++quantDeCaracteres;
        textoReformulado += texto[i];

        if(quantDeCaracteres == 100){
          textoReformulado += "\r\n";
          quantDeCaracteres = 0;
        }

      }
    }

    return textoReformulado;
  }
}