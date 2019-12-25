import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Memorando } from '../models/Memorando';
import { MemorandoService } from '../serviços/memorando.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
    id: string;
    items: MenuItem[];
    memorandos: Memorando[];
    
    constructor(private router: Router, 
        private memorandoS: MemorandoService,
        private messageService: MessageService) { }

    ngOnInit(){
        this.id = sessionStorage.getItem('id-usuario');
        
        this.items = [
            {
                label: 'Memorando',
                items: [
                    {label: 'Enviar',
                    icon: 'pi pi-fw pi-envelope',
                    command: (event: Event) => {this.enviarMemorando();}},
                    {label: 'Mostrar Enviados',
                    icon: 'pi pi-fw pi-upload',
                    command: (event: Event) => { this.mostrarMemorandosEnviados();}},
                    {label: 'Mostrar Recebidos',
                    icon: 'pi pi-fw pi-download',
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
    
    deslogar(){
        sessionStorage.removeItem("id-usuario");
        sessionStorage.removeItem("id-setor");
        sessionStorage.removeItem("id-memorando");
        sessionStorage.setItem('toast','11');
        this.router.navigate(['']);
    }

    mostrarAviso() {
        this.messageService.add({key: 'c', sticky: true, severity:'success', summary:'Deseja relamente sair?', detail:'pressione o sim para sair'});
    }

    onConfirm() {
        this.messageService.clear('c');
        this.deslogar();
    }

    onReject() {
        this.messageService.clear('c');
    }
    
    clear() {
        this.messageService.clear();
    }

    enviarMemorando(){
        this.router.navigate(['/envio-memorando']);
    }

    exibirMemorando(i){
        sessionStorage.setItem("id-usuario", this.memorandos[i].getId());
        this.router.navigate(['/vizualizar', this.memorandos[i].getId()]);
    }

    mostrarMemorandosEnviados(){
        this.router.navigate(['enviados', this.id]);
    }

    mostrarMemorandosRecebidos(){
        this.router.navigate(['recebidos', this.id]);
    }

    listarSetores(){
        this.router.navigate(['listar-setores-de-usuario/', this.id]);
    }
}