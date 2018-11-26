import { Component, OnInit } from '@angular/core';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';

@Component({
  selector: 'app-listagem-de-setor',
  templateUrl: './listagem-de-setor.component.html',
  styleUrls: ['./listagem-de-setor.component.css']
})
export class ListagemDeSetorComponent implements OnInit {
  id: string;
  setores: Setor[] = [];
  usuarios = [];

  constructor(private setorService: SetorService, private router: Router, private usuariosService: UsuarioService) { }

  ngOnInit() {
    this.id = sessionStorage.getItem('id-usuario');
    this.getSetores();
  }

  getNomeDoUsuario(setor){
    let id = setor.id;
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].idDoSetor == id){
        return this.usuarios[i].nome;
      }
    }
  }

  getSiapeDoUsuario(setor){
    let id = setor.id;
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].idDoSetor == id){
        return this.usuarios[i].siape;
      }
    }
  }

  getSetores(){
    this.setorService.listarTodos().subscribe(listaSetores=>{
      let setArr = listaSetores;
      this.setores = setArr;
      this.getUsuarios();
    });
  }

  getUsuarios(){
    this.usuariosService.listarTodos().subscribe(listaDeUsuarios=>{
      let userArr = listaDeUsuarios;
      this.usuarios = userArr;
    })
  }

  atualizar(id){
    this.router.navigate(['/atualizar-setor', id]);
  }

}
