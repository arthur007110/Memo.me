import { Component, OnInit } from '@angular/core';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';

@Component({
  selector: 'app-listagem-de-setor',
  templateUrl: './listagem-de-setor.component.html',
  styleUrls: ['./listagem-de-setor.component.css']
})
export class ListagemDeSetorComponent implements OnInit {

  setores: Setor[];

  constructor(private setorService: SetorService) { }

  ngOnInit() {
    this.getSetores();
  }

  getSetores(){
    this.setores = this.setorService.getSetores();
  }

}
