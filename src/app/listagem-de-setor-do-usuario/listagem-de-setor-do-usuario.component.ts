import { Component, OnInit } from '@angular/core';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../serviços/usuario.service';


@Component({
  selector: 'app-listagem-de-setor-do-usuario',
  templateUrl: './listagem-de-setor-do-usuario.component.html',
  styleUrls: ['./listagem-de-setor-do-usuario.component.css']
})
export class ListagemDeSetorDoUsuarioComponent implements OnInit {
  id: string;
  setores: Setor[] = [];
  usuarios: Usuario[] = [];
  
  constructor(private setorService: SetorService, private router: Router, private usuariosService: UsuarioService) { }

  ngOnInit() {
    this.id = sessionStorage.getItem('id-usuario');
    this.getSetores();
  }

  getNomeDoUsuario(idDoUsuario){
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].id == idDoUsuario){
        return this.usuarios[i].nome;
      }
    }
  }

  getSiapeDoUsuario(idDoUsuario){
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].id == idDoUsuario){
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

}
