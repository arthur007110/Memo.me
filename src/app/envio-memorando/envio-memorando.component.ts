import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemorandoService } from '../serviços/memorando.service';
import { Memorando } from '../models/Memorando';

@Component({
  selector: 'app-envio-memorando',
  templateUrl: './envio-memorando.component.html',
  styleUrls: ['./envio-memorando.component.css']
})
export class EnvioMemorandoComponent implements OnInit {

  destinatario:String;
  mensagem:String;
  now= new Date;
  siape:String;
  data:string="";
  memorando:Memorando;

  constructor(private router: Router, private memorandoS: MemorandoService) { }

  gerarData(){
    this.data=(this.now.getDay+"-"+this.now.getMonth+"-"+this.now.getFullYear);
  }

  enviarMemorando(){
    this.memorando= new Memorando(this.mensagem,this.siape,this.destinatario,this.data);
    this.memorandoS.setMemorando(this.memorando);
    this.router.navigate(['home',this.siape]);
  }
  irParaTelaHome(){
    this.router.navigate(['/home',this.siape]);
  }
  ngOnInit() {
    this.siape = sessionStorage.getItem("siape");
  }

}
