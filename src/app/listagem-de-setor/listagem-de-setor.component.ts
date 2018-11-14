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

  constructor(private setorService: SetorService, private router: Router) { }

  ngOnInit() {
    this.siape = sessionStorage.getItem('siape');
    this.getSetores();
  }

  getSetores(){
    this.setorService.listarTodos().subscribe(listaSetores=>{
      this.setores = listaSetores;
    });
    
    //this.setorService.getSetores();
  }

  atualizar(id){
    console.log("Id do Setor: ", id);
    this.router.navigate(['/atualizar-setor', id]);
  }

}
