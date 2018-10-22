import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Memorando } from '../models/Memorando';
import { MemorandoService } from '../serviços/memorando.service';
import { SetorService } from '../serviços/setor.service';
import { Setor } from '../models/Setor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private memorandoS: MemorandoService, private setorS: SetorService) { }

    items: MenuItem[];
    siape:string;
    vizualizando:string;
    memorandos:Memorando[];
    setores:Setor[];

    deslogar(){
        this.router.navigate(['/login']);
    }
    enviarMemorando(){
        this.router.navigate(['/envio-memorando']);
    }
    mostrarMemorandosEnviados(){
        this.vizualizando="Enviados";

    }
    mostrarMemorandosRecebidos(){
        this.vizualizando="Recebidos";
        this.memorandos=this.memorandoS.getMemorandos();
        this.setores=this.setorS.getSetores();
        this.prepararExibicao();

    }
    prepararExibicao(){

        for(let i=0;i<this.memorandos.length;i++){
            this.memorandos[i].setNomeSetorEmissor(this.setorS.getNameById(this.memorandos[i].getsetorEmissor));
        }

    }

    listarSetores(){

    }
    atualizarSetor(){

    }
    cadastrarSetor(){
        this.router.navigate(['/cadastro-setor']);
    }
    ngOnInit(){

        this.mostrarMemorandosRecebidos();
        this.siape = localStorage.getItem("siape");
        
        this.items = [
            {
                label: 'Memorando',
                items: [
                    {label: 'Enviar',
                    command: (event: Event) => {this.enviarMemorando();}},
                    {label: 'Mostrar Enviados',
                    command: (event: Event) => { }},
                    {label: 'Mostrar Recebidos'}
                ]
            },
            {
                label: 'Setor',
                icon: '',
                items: [
                    {label: 'Cadastrar Setor',
                    icon: 'pi pi-fw pi-plus',
                    command: (event: Event) => { this.cadastrarSetor(); }},
                    {label: 'Listar Setores',
                    icon: 'pi pi-fw pi-pencil',
                    command: (event: Event) => { }},
                    {label: 'Atualizar Dados do Setor',
                    icon: 'pi pi-fw pi-refresh',
                    command: (event: Event) => { }}
                ]
            }
        ];
        
    }
}