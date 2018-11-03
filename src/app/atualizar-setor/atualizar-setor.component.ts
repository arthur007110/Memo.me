import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetorService } from '../serviços/setor.service';
import { Setor } from '../models/Setor';

@Component({
  selector: 'app-atualizar-setor',
  templateUrl: './atualizar-setor.component.html',
  styleUrls: ['./atualizar-setor.component.css']
})
export class AtualizarSetorComponent implements OnInit {
  siape: string;
  setores: Setor[] = [];
  setorSelecionado: Setor;
  novoNome: string = "";
  msgErro: boolean = false;
  
  constructor(private router: Router,private setorService: SetorService) { }

  atualizarSetor(){
    if(this.novoNome.length > 0 && this.setorSelecionado != null){
      if(this.setorService.getSetorPorNome(this.novoNome) != null && this.novoNome != this.setorSelecionado.getNome()){
        this.msgErro = true;
      }else{
        this.setorService.atualizarSetor(this.setorSelecionado.getId(), this.novoNome);
        this.router.navigate(['/listar-setores', this.siape]);
      }
    }
  }

  ngOnInit() {
    this.siape = sessionStorage.getItem("siape");
    this.getSetores();
  }

  getSetores(){
    this.setores = this.setorService.getSetores();
  }

  mostrarMsg(){
    this.msgErro = false;
  }

}
