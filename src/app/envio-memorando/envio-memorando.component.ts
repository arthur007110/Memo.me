import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envio-memorando',
  templateUrl: './envio-memorando.component.html',
  styleUrls: ['./envio-memorando.component.css']
})
export class EnvioMemorandoComponent implements OnInit {

  destinatario:String;
  mensagem:String;
  siape:String;

  constructor(private router: Router) { }

  enviarMemorando(){

  }
  irParaTelaHome(){
    this.router.navigate(['/home',this.siape]);
  }
  ngOnInit() {
    this.siape = sessionStorage.getItem("siape");
  }

}
