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
  nomeAntigo: string;
  
  constructor(private router: Router,private setorS: SetorService,private location: Location) { }

  atualizarSetor(){
    if(this.novoNome == null || this.nomeAntigo == null || this.novoNome.length == 0 || this.nomeAntigo.length == 0){
      alert("Preencha todos os campos.");
    }else if(this.novoNome.length < 5){
      alert("O nome do setor precisa ter no mínimo 5 caractéres");
    }else{
      if(this.setorS.getSetorPorNome(this.nomeAntigo) == null){
        alert("O setor " + this.nomeAntigo + " não está cadastrado no sistema.");
      }else if(this.setorS.getSetorPorNome(this.novoNome) != null){
        alert("Já existe um setor cadastrado com esse nome.");
      }else{
        for(let i = 0; i < this.setorS.setores.length; i++){
          if(this.nomeAntigo==this.setorS.setores[i].getNome()){
            this.setorS.setores[i].setNome(this.novoNome);
            this.voltar();
          }
        }
      }
    }
  }
  voltar(){
    this.location.back();
  }

  ngOnInit() {
  }

}
