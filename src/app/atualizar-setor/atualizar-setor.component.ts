import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetorService } from '../serviços/setor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atualizar-setor',
  templateUrl: './atualizar-setor.component.html',
  styleUrls: ['./atualizar-setor.component.css']
})
export class AtualizarSetorComponent implements OnInit {
  novoNome: string;
  idSetor: Number;
  
  constructor(private router: Router,private setorS: SetorService,private location: Location) { }

  atualizarSetor(idSetor){
    
    for(let i = 0; i < this.setorS.setores.length; i++){
      if(idSetor=this.setorS.setores[i].getId()){
        this.setorS.setores[i].setNome(this.novoNome);

      }
    }
  }
  voltar(){
    this.location.back();
  }

  ngOnInit() {
  }

}
