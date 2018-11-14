import { Component, OnInit } from '@angular/core';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listagem-de-setor-do-usuario',
  templateUrl: './listagem-de-setor-do-usuario.component.html',
  styleUrls: ['./listagem-de-setor-do-usuario.component.css']
})
export class ListagemDeSetorDoUsuarioComponent implements OnInit {
  setores: Setor[];
  siape:string;
  
  constructor(private setorService: SetorService, private router: Router) { }

  ngOnInit() {
    this.siape = sessionStorage.getItem("siape");
    this.getSetores();
  }

  getSetores(){
    //this.setores = this.setorService.getSetores();
  }

}
