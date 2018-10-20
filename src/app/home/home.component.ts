import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

    items: MenuItem[];
    siape:string;

    deslogar(){
        this.router.navigate(['/login']);
    }
    enviarMemorando(){
        this.router.navigate(['/envio-memorando']);
    }
    mostrarMemorandosEnviados(){

    }
    mostrarMemorandosRecebidos(){
        
    }
    listarSetores(){

    }
    atualizarSetor(){

    }
    ngOnInit() {


    this.siape = sessionStorage.getItem("siape");

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


