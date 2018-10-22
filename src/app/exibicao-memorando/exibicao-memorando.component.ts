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
  memorando:Memorando;


  constructor(private router: Router,private memorandoS: MemorandoService) { }

  marcarVisto(){

  }
  receberMemorandos(){
    this.memorando=this.memorandoS.getMemorandoPorId(this.id);
  }

  ngOnInit() {
    this.id=sessionStorage.getItem("id");
  }

}
