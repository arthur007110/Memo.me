import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemorandoService } from '../serviços/memorando.service';
import { Memorando } from '../models/Memorando';
import { UsuarioService } from '../serviços/usuario.service';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';

@Component({
  selector: 'app-envio-memorando',
  templateUrl: './envio-memorando.component.html',
  styleUrls: ['./envio-memorando.component.css']
})
export class EnvioMemorandoComponent implements OnInit {

  setores:Setor[];
  emissor:string;
  destinatario:string;
  mensagem:string;
  now= new Date;
  siape:string;
  data:string="";
  memorando:Memorando;

  constructor(private router: Router, private memorandoS: MemorandoService, private usuarioS:UsuarioService, private setorS: SetorService) { }

  gerarData(){
    this.data=(this.now.getDay()+"-"+this.now.getMonth()+"-"+this.now.getFullYear());
  }

  enviarMemorando(){
    this.identificarServidorEmissor();
    this.gerarData();
    this.memorando= new Memorando(this.mensagem,this.emissor,this.destinatario,this.data);
    this.memorandoS.setMemorando(this.memorando);
    this.router.navigate(['home',this.siape]);
  }
  irParaTelaHome(){
    this.router.navigate(['/home',this.siape]);
  }
  identificarServidorEmissor(){
    this.emissor=this.usuarioS.getUsuariosPorSiape(this.siape).getsetor();
  }
  receberSetores(){
    this.setores=this.setorS.getSetores();
  }
  verificar
  ngOnInit() {
    this.receberSetores();
    this.siape = sessionStorage.getItem("siape");
  }

}
