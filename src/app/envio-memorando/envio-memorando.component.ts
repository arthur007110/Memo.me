import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemorandoService } from '../serviços/memorando.service';
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
  siape:string;

  constructor(
    private router: Router,
    private memorandoS: MemorandoService,
    private setorS: SetorService) { }

  ngOnInit() {
    this.siape = sessionStorage.getItem("siape");
    this.receberSetores();
  }


  enviarMemorando(){
    // FALTA COLOCAR O TOAST. VAI ALERT POR ENQUANTO MESMO
    let verificacao = this.memorandoS.verificacaoEnviarMemorando(this.destinatario, this.siape, this.mensagem);

    if(verificacao == 0){
      this.irParaTelaHome();
    }else if(verificacao == 1){
      alert("Preencha todos os campos.");
    }
  }

  irParaTelaHome(){
    this.router.navigate(['/recebidos',this.siape]);
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
}
