import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html',
  styleUrls: ['./cadastro-setor.component.css']
})
export class CadastroSetorComponent implements OnInit {
  nome: string;
  id: string;
  constructor(private router: Router, private dadosService: DadosService) { }

  ngOnInit() {
  }
  irParaTelaDeSetores(){
    this.router.navigate(["/setores"])
  }
}
