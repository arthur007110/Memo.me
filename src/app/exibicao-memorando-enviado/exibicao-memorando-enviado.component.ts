import { Component, OnInit } from '@angular/core';
import { Memorando } from '../models/Memorando';
import { Router } from '@angular/router';
import { MemorandoService } from '../serviços/memorando.service';

@Component({
  selector: 'app-exibicao-memorando-enviado',
  templateUrl: './exibicao-memorando-enviado.component.html',
  styleUrls: ['./exibicao-memorando-enviado.component.css']
})
export class ExibicaoMemorandoEnviadoComponent implements OnInit {

  mensagem:string;
  id:string;
  idUsuario:string;
  memorando:Memorando;


  constructor(private router: Router, private memorandoS: MemorandoService) { }

  ngOnInit() {
    this.id=sessionStorage.getItem("id-memorando");
    this.idUsuario=sessionStorage.getItem("id-usuario");
    this.receberMemorandos();
    this.exibirMensagem();
  }

  voltar(){
    sessionStorage.removeItem("id-memorando");
    this.router.navigate(['/enviados',this.idUsuario]);
  }
  receberMemorandos(){
    this.memorando=this.memorandoS.getMemorandoPorId(this.id);
  }
  exibirMensagem(){
    this.mensagem=this.memorando.getmensagem();
  }
}
