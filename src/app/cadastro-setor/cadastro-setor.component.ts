import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html',
  styleUrls: ['./cadastro-setor.component.css']
})
export class CadastroSetorComponent implements OnInit {

  constructor(private router: Router) { }

  siape:string;

  ngOnInit() {
    this.siape=sessionStorage.getItem("siape");
  }

  cadastrar(){

  }
  irParaTelaHome(){
    this.router.navigate(['/home',this.siape]);
  }
}
