import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemorandoService } from '../serviços/memorando.service';
import { UsuarioService } from '../serviços/usuario.service';
import { SetorService } from '../serviços/setor.service';
import { Setor } from '../models/Setor';
import { MessageService, DialogService } from 'primeng/api';
import { PdfService } from '../serviços/pdf.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { VizualicaoDeMemorandoComponent } from '../vizualicao-de-memorando/vizualicao-de-memorando.component';

@Component({
  selector: 'app-exibir-memorandos-recebidos',
  templateUrl: './exibir-memorandos-recebidos.component.html',
  styleUrls: ['./exibir-memorandos-recebidos.component.css'],
  providers: [MessageService, DialogService]
})
export class ExibirMemorandosRecebidosComponent implements OnInit {
    idDoUsuario: string;
    memorandos: any[];
    memorandosDoUsuario: any[];
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
    usuariosQueVizualizaram: any[] = [];

    constructor(private router: Router,
        private memorandoS: MemorandoService,
        private usuarioS: UsuarioService, 
        private setorS: SetorService, 
        private pdfService: PdfService,
        public dialogService: DialogService,
        private messageService: MessageService) { }

    ngOnInit(){
        this.idDoUsuario = sessionStorage.getItem('id-usuario');
        this.reconhecerUsuario();
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
            clear: 'Limpar',
            dateFormat: 'dd/mm/yy'
        };
        this.options = [
            {option: 'Vistos'},
            {option: 'Não Vistos'},
            {option: 'Todos'},
        ];
    }

    show($event, overlayPanel: OverlayPanel, memorando){
        this.usuariosQueVizualizaram = memorando.usuariosQueVizualizaram;
        overlayPanel.toggle(event);
    }

    //Funções para a pesquisa por setores =====>
    buscar(){
        let arr = [];
        if(this.setor == null || this.setor == ''){
            if(this.date == null){
                if(this.selectedOption == null || this.selectedOption == ''){
                   this.memorandos = this.memorandosDoUsuario
                }else{
                    arr = this.buscarVistos(this.memorandosDoUsuario);
                    this.memorandos = arr;
                }
            }else{
                if(this.selectedOption == null || this.selectedOption == ''){
                    arr = this.buscarDatas(this.memorandosDoUsuario);
                    this.memorandos = arr;
                }else{
                    arr = this.buscarDatas(this.memorandosDoUsuario);
                    arr = this.buscarVistos(arr);
                    this.memorandos = arr;
                }
            }
        }else{
            if(this.date == null){
                if(this.selectedOption == null || this.selectedOption == ''){
                    arr = this.buscarSetores(); 
                    this.memorandos = arr;               
                }
            }else{
                if(this.selectedOption == null || this.selectedOption == ''){
                    arr = this.buscarSetores();
                    arr = this.buscarDatas(this.memorandosDoUsuario);
                    this.memorandos = arr;
                }else{
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

    gerarPDF(memorando){
        this.memorandoS.marcarComoVisto(memorando, this.idDoUsuario);
        this.listarMemorandos();
        this.pdfService.gerarPdf(memorando);
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
            }else {
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
    
    reconhecerUsuario(){
        this.usuarioS.listarPorId(this.idDoUsuario).subscribe(resultado => {
            this.usuario = resultado;
        });
        this.setorS.listarTodos().subscribe(resultado => {
            this.setores = resultado;
        });
        this.listarMemorandos();
    }

    listarMemorandos(){
        this.memorandoS.listarTodos().subscribe(resultado => {
            this.memorandosDoUsuario = this.getMemorandosRecebidosSetor(resultado);
            this.memorandos = this.memorandosDoUsuario;
        });
    }

    getMemorandosRecebidosSetor(memorandosCadastrados){
        let memorandosRecebidos: any[] = [];

        for(let i = 0; i < memorandosCadastrados.length; i++){
            if(memorandosCadastrados[i].idSetorDestinatario == this.usuario.idDoSetor){
                memorandosRecebidos.push(memorandosCadastrados[i]);
            }
        }

        memorandosRecebidos.sort((m1, m2) => {
            let numeroDeM1 = m1.numeroDoMemorando.substring(0, m1.numeroDoMemorando.indexOf('/'));
            let numeroDeM2 = m2.numeroDoMemorando.substring(0, m2.numeroDoMemorando.indexOf('/'));
            if(Number.parseInt(numeroDeM1) > Number.parseInt(numeroDeM2)){
                return 0;
            }else{
                return 1;
            }
        });
        
        return memorandosRecebidos;
    }

    mostrarVizualicoes(idDoMemorando, numeroDoMemorando){
        const ref = this.dialogService.open(VizualicaoDeMemorandoComponent, {
            data: {
                id: idDoMemorando
            },
            header: 'Vizualizações do memorando: ' +numeroDoMemorando,
            width: '70%'
        });
    }
}