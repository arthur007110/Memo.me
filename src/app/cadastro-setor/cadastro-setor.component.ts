import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { DadosService } from '../dados.service';
=======
>>>>>>> 6f3b70a9244a10574355c618ffb832593568fec0

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html',
  styleUrls: ['./cadastro-setor.component.css']
})
export class CadastroSetorComponent implements OnInit {
<<<<<<< HEAD
  nome: string;
  id: string;
  constructor(private router: Router, private dadosService: DadosService) { }
=======

  constructor(private router: Router) { }

  siape:string;
>>>>>>> 6f3b70a9244a10574355c618ffb832593568fec0

  ngOnInit() {
    this.siape=sessionStorage.getItem("siape");
  }
<<<<<<< HEAD
  irParaTelaDeSetores(){
    this.router.navigate(["/setores"])
=======

  cadastrar(){

  }
  irParaTelaHome(){
    this.router.navigate(['/home',this.siape]);
>>>>>>> 6f3b70a9244a10574355c618ffb832593568fec0
  }
}
