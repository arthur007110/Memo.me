import { Component, OnInit } from '@angular/core';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listagem-de-setor-do-usuario',
  templateUrl: './listagem-de-setor-do-usuario.component.html',
  styleUrls: ['./listagem-de-setor-do-usuario.component.css']
})
export class ListagemDeSetorDoUsuarioComponent implements OnInit {
  setores: Setor[];
  items: MenuItem[];
  siape:string;
  
  deslogar(){
    this.router.navigate(['/login']);
  }
  enviarMemorando(){
    this.router.navigate(["/envio-memorando"]);
  }
  mostrarMemorandosEnviados(){
    this.router.navigate(["/enviados/", this.siape]);
  }
  mostrarMemorandosRecebidos(){
  this.router.navigate(["/recebidos/", this.siape]);
  }
  listarSetores(){
    this.router.navigate(['/listagem-de-setor']);
  }
  atualizarSetor(){

  }
  cadastrarSetor(){
    this.router.navigate(['/cadastro-setor']);
  }
  constructor(private setorService: SetorService, private router: Router) { }

  ngOnInit() {
    this.siape = sessionStorage.getItem("siape");
    this.getSetores();
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
          command: (event: Event) => { this.listarSetores()}}
        ]
      }
    ];
  }

  getSetores(){
    this.setores = this.setorService.getSetores();
  }

}
