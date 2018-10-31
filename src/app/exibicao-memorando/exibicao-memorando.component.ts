import { Component, OnInit } from '@angular/core';
import { Memorando } from '../models/Memorando';
import { Router } from '@angular/router';
import { MemorandoService } from '../serviços/memorando.service';

@Component({
  selector: 'app-exibicao-memorando',
  templateUrl: './exibicao-memorando.component.html',
  styleUrls: ['./exibicao-memorando.component.css']
})
export class ExibicaoMemorandoComponent implements OnInit {

  mensagem:string;
  id:string;
  siape:string;
  memorando:Memorando;


  constructor(private router: Router,private memorandoS: MemorandoService) { }

  marcarVisto(){

    this.memorandoS.getMemorandoPorId(this.id).marcarComoVisto();
    sessionStorage.removeItem("id");
    this.router.navigate(['/home',this.siape]);
  }
  receberMemorandos(){
    this.memorando=this.memorandoS.getMemorandoPorId(this.id);
  }
  exibirMensagem(){
    this.mensagem=this.memorando.getmensagem();
  }

  ngOnInit() {
    this.id=sessionStorage.getItem("id");
    this.siape=sessionStorage.getItem("siape");
    this.receberMemorandos();
    this.exibirMensagem();
  }

}
