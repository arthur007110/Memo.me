import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Memorando } from '../models/Memorando';
import { MemorandoService } from '../serviços/memorando.service';
import { UsuarioService } from '../serviços/usuario.service';
import { SetorService } from '../serviços/setor.service';
import { Setor } from '../models/Setor';

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

    constructor(private router: Router, private memorandoS: MemorandoService, private usuarioS: UsuarioService, private setorS: SetorService) { }

    ngOnInit(){
        this.id = sessionStorage.getItem('id-usuario');
        this.listarMemorandosEReconhecerUsuario();
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
        }
    }

    atualizarResultados(event){
        console.log(this.text);
        console.log("AtualizarResultado: ");
        console.log(event);
        if(this.text.length == 0){
            console.log("AtualizarResultado 1: ");
            this.memorandos = this.memorandosDoUsuario;
        }

        console.log("AtualizarResultado 2: ");
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

    getNomeDoSetorDeDestino(id){
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