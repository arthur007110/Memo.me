import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Memorando } from '../models/Memorando';
import { MemorandoService } from '../serviços/memorando.service';
import { UsuarioService } from '../serviços/usuario.service';
import { SetorService } from '../serviços/setor.service';
import { Setor } from '../models/Setor';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-exibir-memorandos-enviados',
  templateUrl: './exibir-memorandos-enviados.component.html',
  styleUrls: ['./exibir-memorandos-enviados.component.css']
})
export class ExibirMemorandosEnviadosComponent implements OnInit {
    id: string;
    memorandos:Memorando[];
    memorandosDoUsuario: Memorando[];
    setores: Setor[];
    usuario;

    text: string;
    results: string[];

    constructor(private router: Router,
                private memorandoS: MemorandoService, 
                private usuarioS: UsuarioService, 
                private setorS: SetorService,) { }

    ngOnInit(){
        this.id = sessionStorage.getItem('id-usuario');
        this.listarMemorandosEReconhecerUsuario();
    }

    //Funções para a pesquisa por setores =====>
    buscar(event){
        let arr = [];
        for(let i = 0; i < this.setores.length; i++){
            if(this.setores[i].nome.toLowerCase().indexOf(event.query.toLowerCase()) != -1){
                arr.push(this.setores[i].nome);
            }
        }
        this.results = arr;

        if(this.results.length == 1){
            console.log("R", this.results)
            this.atualizarMemorandosDoSetor(this.getIdDoSetorPorNome(this.results[0]));
        }
    }

    atualizarResultados(event){
        this.memorandos = this.memorandosDoUsuario;
    }

    atualizarMemorandosDoSetor(idDoSetor){
        this.memorandos = [];
        for(let i = 0; i < this.memorandosDoUsuario.length; i++){
            if(this.memorandosDoUsuario[i].idSetorDestinatario == idDoSetor){
                this.memorandos.push(this.memorandosDoUsuario[i]);
            }
        }
    }

    getIdDoSetorPorNome(nomeDoSetor){
        for(let i = 0; i < this.setores.length; i++){
            if(this.setores[i].nome == nomeDoSetor){
                return this.setores[i].id;
            }
        }
    }
    // <===============

    gerarPDF(memorando:Memorando) {

        let documento = new jsPDF();
      
        documento.setFont("Courier");
      
        documento.setFontStyle("bold");
      
        documento.setFontSize(20);
      
        documento.text("Memorando", 65, 15);
      
      
        documento.setFillColor(50,50,50);
      
        documento.rect(10, 20, 30, 8, "FD");
      
        documento.rect(10, 28, 30, 8, "FD");
      
        documento.rect(10, 36, 30, 8, "FD");
      
        documento.rect(40, 20, 160, 8, "s");
      
        documento.rect(40, 28, 160, 8, "s");
      
        documento.rect(40, 36, 160, 8, "s");
      
      
        documento.setFontSize(12);
      
        documento.setTextColor(255, 255, 255);
      
        documento.text("Setor Emissor:", 12, 25);
      
        documento.text("Setor Destinatario:", 12, 33);
      
        documento.text("Conteúdo:", 12, 41);
      
      
        documento.setFontStyle("normal");
      
        documento.setTextColor(0, 0, 0);
      
        let setorEmissor:string =this.getNomeDoSetorEmissor(memorando.idSetorEmissor);

        documento.text(setorEmissor, 42, 25);
        
        let setorDestinatario:string = this.getNomeDoSetorDeDestino(memorando.idSetorDestinatario);
        documento.text(setorDestinatario, 42, 33);
      
        let conteudo:string = memorando.mensagem;
        documento.text(conteudo, 42, 41);
      

        var string = documento.output('datauristring');
        var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
        var x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();
      
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

    exibirMemorando(memorando){
        sessionStorage.setItem("id-memorando", memorando.id);
        this.router.navigate(['vizualizar-enviado/', memorando.id]);
    }
    
    listarMemorandosEReconhecerUsuario(){
        this.usuarioS.listarPorId(this.id).subscribe(resultado => {
            this.usuario = resultado;
        });
        this.setorS.listarTodos().subscribe(resultado => {
            this.setores = resultado;
        });
        this.memorandoS.listarTodos().subscribe(resultado => {
            this.memorandosDoUsuario = this.memorandoS.getMemorandosEnviadosSetor(this.usuario.idDoSetor, resultado);
            this.memorandos = this.memorandosDoUsuario;
        });
    }
}