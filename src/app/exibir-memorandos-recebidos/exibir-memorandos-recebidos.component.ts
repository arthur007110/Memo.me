import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Memorando } from '../models/Memorando';
import { MemorandoService } from '../serviços/memorando.service';
import { UsuarioService } from '../serviços/usuario.service';
import { SetorService } from '../serviços/setor.service';
import { Setor } from '../models/Setor';
import { MessageService } from 'primeng/api';

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

    text: string;
    results: string[];

    constructor(private router: Router,
                private memorandoS: MemorandoService,
                private usuarioS: UsuarioService, 
                private setorS: SetorService, 
                private messageService: MessageService) { }

    ngOnInit(){
        this.id = sessionStorage.getItem('id-usuario');
        this.listarMemorandosEReconhecerUsuario();
        let toast = sessionStorage.getItem('toast');
        this.executarTimer(toast);
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

    search(event){
        let resultado = [];
        for(let i = 0; i < this.setores.length; i++){
            if(this.setores[i].nome.toLowerCase().indexOf(this.text.toLowerCase()) != -1){
                resultado.push(this.setores[i].nome);
                this.results = resultado;
            }
        }

        if(resultado.length == 1){
            let idDoSetor = this.getIdDoSetorPorNome(resultado[0]);
            if(idDoSetor != undefined){
                this.atualizarMemorandosDoSetor(idDoSetor);
            }
        }else if(event.querry == undefined){
            this.memorandos = this.memorandosDoUsuario;
        }
    }

    atualizarResultados(event){
        if(this.text.length == 0){
            this.memorandos = this.memorandosDoUsuario;
        }
    }

    atualizarMemorandosDoSetor(idDoSetor){
        this.memorandos = [];
        for(let i = 0; i < this.memorandosDoUsuario.length; i++){
            if(this.memorandosDoUsuario[i].idSetorEmissor == idDoSetor){
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