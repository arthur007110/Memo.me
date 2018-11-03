import { Component, OnInit } from '@angular/core';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-de-setor',
  templateUrl: './listagem-de-setor.component.html',
  styleUrls: ['./listagem-de-setor.component.css']
})
export class ListagemDeSetorComponent implements OnInit {

  setores: Setor[];
  items: MenuItem[];
  siape:string;
  
  deslogar(){
    this.router.navigate(['/login']);
  }

  constructor(private setorService: SetorService, private router: Router) { }

  ngOnInit() {
    this.getSetores();
  }

  getSetores(){
    this.setores = this.setorService.getSetores();
  }

}
