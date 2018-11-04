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
  destinatario:Setor;
  mensagem:string;
  now= new Date;
  siape:string;
  data:string="";
  memorando:Memorando;

  constructor(
    private router: Router,
    private memorandoS: MemorandoService,
    private usuarioS:UsuarioService,
    private setorS: SetorService) { }

  gerarData(){
    this.data=(this.now.getDay()+"-"+this.now.getMonth()+"-"+this.now.getFullYear());
  }

  enviarMemorando(){
    if(this.destinatario == null){
      return;
    }
    this.identificarServidorEmissor();
    this.gerarData();
    this.memorando= new Memorando(this.mensagem,this.emissor,this.destinatario.getId(),this.data);
    this.memorandoS.setMemorando(this.memorando);
    this.router.navigate(['/recebidos',this.siape]);
  }
  irParaTelaHome(){
    this.router.navigate(['/recebidos',this.siape]);
  }
  identificarServidorEmissor(){
    this.emissor=this.usuarioS.getUsuariosPorSiape(this.siape).getsetor();
  }
  receberSetores(){
    this.setores = [];
    let setoresCadastrados = this.setorS.getSetores();

    //Excluindo o seu própio setor da lista
    for(let i = 0; i < setoresCadastrados.length; i++){
      if(setoresCadastrados[i].getUsuario().getSiape() != this.siape){
        this.setores.push(setoresCadastrados[i]);
      }
    }
  }

  ngOnInit() {
    this.siape = sessionStorage.getItem("siape");
    this.receberSetores();
  }
}
