import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Memorando } from '../models/Memorando';
import { MemorandoService } from '../serviços/memorando.service';
import { UsuarioService } from '../serviços/usuario.service';
import { SetorService } from '../serviços/setor.service';
import { Setor } from '../models/Setor';
import { MessageService } from 'primeng/api';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-exibir-memorandos-recebidos',
  templateUrl: './exibir-memorandos-recebidos.component.html',
  styleUrls: ['./exibir-memorandos-recebidos.component.css'],
  providers: [MessageService]
})
export class ExibirMemorandosRecebidosComponent implements OnInit {
    id: string;
    memorandos:Memorando[];
    memorandosDoUsuario: Memorando[];
    setores: Setor[];
    usuario;
    date: Date;
    options: any;
    setor: any;

    selectedOption: any;
    ptbr : any;

    text: string;
    setoresResults: string[];
    dataResults: string[];
    vistoResults: boolean[];

    constructor(private router: Router,
                private memorandoS: MemorandoService,
                private usuarioS: UsuarioService, 
                private setorS: SetorService, 
                private messageService: MessageService,) { }

    ngOnInit(){
        this.id = sessionStorage.getItem('id-usuario');
        this.listarMemorandosEReconhecerUsuario();
        let toast = sessionStorage.getItem('toast');
        this.executarTimer(toast);
        this.ptbr = {
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Segunda ", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            dayNamesMin: ["D","S","T","Q","Q","S","S"],
            monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
            monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
            today: 'Hoje',
            clear: 'limpar',
            dateFormat: 'dd/mm/yy'
        };
        this.options = [
            {option: 'Vistos'},
            {option: 'Não Vistos'},
            {option: 'Todos'},
        ];
    }

    //Funções para a pesquisa por setores =====>
    buscar(){

        let arr = [];
        if(this.setor == null){
            console.log("1");
            if(this.date == null){
                console.log("2");
                if(this.selectedOption == null){
                    console.log("3");
                   this.memorandos = this.memorandosDoUsuario
                }
                   else{
                       console.log("new");
                       arr = this.buscarVistos(this.memorandosDoUsuario);
                       this.memorandos = arr;
                   }
            }else{
                console.log("4");
                if(this.selectedOption == null){
                    console.log("5");
                    arr = this.buscarDatas(this.memorandosDoUsuario);
                    this.memorandos = arr;
                }else{
                    console.log("5");
                    arr = this.buscarDatas(arr);
                    arr = this.buscarVistos(arr);
                    this.memorandos = arr;
                }
            }
        }else{
            console.log("7");
            if(this.date == null){
                console.log("8");
                if(this.selectedOption == null){
                    console.log("9");
                    arr = this.buscarSetores(); 
                    this.memorandos = arr;               
                }
            }else{
                console.log("10");
                if(this.selectedOption == null){
                    console.log("11");
                    arr = this.buscarSetores();
                    arr = this.buscarDatas(this.memorandosDoUsuario);
                    this.memorandos = arr;
                }else{
                    console.log("12");
                    arr = this.buscarSetores();
                    arr = this.buscarDatas(arr);
                    arr = this.buscarVistos(arr);
                    this.memorandos = arr;
                }
            }
        }
    }

    buscarSetores(){
        let arr = [];
        for(let i = 0; i < this.setores.length; i++){
            if(this.setores[i].nome.toLowerCase().indexOf(this.setor.toLowerCase()) != -1){
                arr.push(this.setores[i].nome);
            }
        }
        this.setoresResults = arr;

        if(this.setoresResults.length == 1){
            return this.atualizarMemorandosSetor(this.getIdDoSetorPorNome(this.setoresResults[0]));
        }
    }
    //working
    buscarDatas(memorandos){
        
        let data = this.date.getDate() + '/' + (this.date.getMonth()+1) + '/' + this.date.getFullYear();
        return this.atualizarMemorandosData(data,memorandos);
        
    }
    buscarVistos(memorandos){
        console.log("opção selecionada: "+this.selectedOption.option);
        if(this.selectedOption.option == 'Vistos'){
            return this.atualizarMemorandosVisto(true,memorandos);
        }else if(this.selectedOption.option == 'Não Vistos'){
            return this.atualizarMemorandosVisto(false,memorandos);
        }
    }

    atualizarResultados(event){
        this.memorandos = this.memorandosDoUsuario;
    }

    atualizarMemorandosSetor(idDoSetor){
        let memorandosaux = [];
        for(let i = 0; i < this.memorandosDoUsuario.length; i++){
            if(this.memorandosDoUsuario[i].idSetorEmissor == idDoSetor){
                memorandosaux.push(this.memorandosDoUsuario[i]);
            }
        }
        return memorandosaux;
    }

    atualizarMemorandosData(data,memorandos){
        let memorandosaux = [];
        for(let i = 0; i < memorandos.length; i++){
            if(memorandos[i].dataEnvio == data){
                memorandosaux.push(memorandos[i]);
            }
        }
        return memorandosaux;
    }

    atualizarMemorandosVisto(visto: boolean, memorandos){
        let memorandosaux = [];
        for(let i = 0; i < memorandos.length; i++){
            if(memorandos[i].visto == visto){
                memorandosaux.push(memorandos[i]);
            }
        }
        return memorandosaux;
        
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

    mostrarToast(toast){
        if(toast=='2'){
            this.messageService.add({severity:'success', summary: 'Logado!', detail:'Login feito com sucesso. Bem vindo!'});
            sessionStorage.removeItem('toast');
        }else if(toast=='10'){
            this.messageService.add({severity:'success', summary: 'Enviado!', detail:'Seu Memorando foi enviado com sucesso!'});
            sessionStorage.removeItem('toast');
        }
    
      }

      executarTimer(toast){
        let timeLeft: number = 1;
        let interval;
    
        interval = setInterval(() => {
          if(timeLeft > 0) {
            timeLeft--;
          } else {
            clearInterval(interval);
            this.mostrarToast(toast);
          }
        },200);
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
        sessionStorage.setItem("id-memorando",memorando.id);
        this.router.navigate(['/vizualizar',memorando.id]);
    }
    
    listarMemorandosEReconhecerUsuario(){
        this.usuarioS.listarPorId(this.id).subscribe(resultado => {
            this.usuario = resultado;
        });
        this.setorS.listarTodos().subscribe(resultado => {
            this.setores = resultado;
        });
        this.memorandoS.listarTodos().subscribe(resultado => {
            this.memorandosDoUsuario = this.memorandoS.getMemorandosRecebidosSetor(this.usuario.idDoSetor, resultado);
            this.memorandos = this.memorandosDoUsuario;
        });
    }
}