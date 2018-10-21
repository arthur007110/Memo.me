import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetorService } from '../serviços/setor.service';

@Component({
  selector: 'app-atualizar-setor',
  templateUrl: './atualizar-setor.component.html',
  styleUrls: ['./atualizar-setor.component.css']
})
export class AtualizarSetorComponent implements OnInit {
  novoId: String;
  novoNome: String;
  constructor() { }

  atualizarSetor(SetorService){
    
  }
  ngOnInit() {
  }

}
