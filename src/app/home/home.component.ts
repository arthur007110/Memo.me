import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Memorando } from '../models/Memorando';
import { MemorandoService } from '../serviços/memorando.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private memorandoS: MemorandoService) { }

    items: MenuItem[];
    siape:string;
    memorandos:Memorando[];

    deslogar(){
        sessionStorage.removeItem("siape");
        this.router.navigate(['']);
    }
    enviarMemorando(){
        this.router.navigate(['/envio-memorando']);
    }
    exibirMemorando(i){
        sessionStorage.setItem("id",this.memorandos[i].getId());
        this.router.navigate(['/vizualizar',this.memorandos[i].getId()]);
    }
    mostrarMemorandosEnviados(){
        this.router.navigate(['enviados',this.siape]);
    }
    mostrarMemorandosRecebidos(){
        this.router.navigate(['recebidos',this.siape]);
    }
    listarSetores(){
        this.router.navigate(['listar-setores/',this.siape]);
    }
    ngOnInit(){
        
        this.siape = sessionStorage.getItem("siape");
        
        this.items = [
            {
                label: 'Memorando',
                items: [
                    {label: 'Enviar',
                    command: (event: Event) => {this.enviarMemorando();}},
                    {label: 'Mostrar Enviados',
                    command: (event: Event) => { this.mostrarMemorandosEnviados();}},
                    {label: 'Mostrar Recebidos',
                    command: (event: Event) => { this.mostrarMemorandosRecebidos();}}
                ]
            },
            {
                label: 'Setor',
                icon: '',
                items: [
                    {label: 'Listar Setores',
                    icon: 'pi pi-fw pi-pencil',
                    command: (event: Event) => { this.listarSetores(); }}
                ]
            }
        ];
        
    }
}