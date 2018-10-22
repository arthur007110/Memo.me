import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetorService } from '../serviços/setor.service';

@Component({
  selector: 'app-atualizar-setor',
  templateUrl: './atualizar-setor.component.html',
  styleUrls: ['./atualizar-setor.component.css']
})
export class AtualizarSetorComponent implements OnInit {
  idSetor: String;
  novoNome: String;
  siape:String;
  constructor(private router: Router, private setorS: SetorService) { }

  atualizarSetor(){
    
  }
  ngOnInit() {
    this.siape=sessionStorage.getItem("siape");
  }

  irParaTelaHome(){
    this.router.navigate(['/home',this.siape])
  }
}
