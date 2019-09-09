import { Component, OnInit } from '@angular/core';
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
  memorando: any = null;

  constructor(private router: Router, private memorandoS: MemorandoService) { }

  ngOnInit() {
    this.memorando = {numeroDeMemorando: 0};
    this.id = sessionStorage.getItem("id-memorando");
    this.idUsuario=sessionStorage.getItem("id-usuario");
    this.receberMemorandos();
  }

  voltar(){
    sessionStorage.removeItem("id-memorando");
    this.router.navigate(['/recebidos',this.idUsuario]);
  }

  receberMemorandos(){
    this.memorandoS.listarPorId(this.id).subscribe(resultado => {
      this.memorando = resultado;
      this.memorandoS.marcarComoVisto(this.memorando, this.idUsuario);
      this.exibirMensagem();
    });
  }
  
  exibirMensagem(){
    this.mensagem=this.memorando.mensagem;
  }
}