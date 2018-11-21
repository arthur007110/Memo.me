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
  id:string;
  idUsuario: string;
  mensagem:string;
  memorando:Memorando;

  constructor(private router: Router, private memorandoS: MemorandoService) { }

  ngOnInit() {
    this.id = sessionStorage.getItem("id-memorando");
    this.idUsuario=sessionStorage.getItem("id-usuario");
    this.receberMemorandos();
    this.exibirMensagem();
  }

  marcarVisto(){
    this.memorandoS.getMemorandoPorId(this.id).marcarComoVisto();
    sessionStorage.removeItem("id-memorando");
    this.router.navigate(['/recebidos',this.idUsuario]);
  }

  receberMemorandos(){
    this.memorando=this.memorandoS.getMemorandoPorId(this.id);
  }
  
  exibirMensagem(){
    this.mensagem=this.memorando.getmensagem();
  }
}
