import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { SetorService } from '../serviços/setor.service';
import { UsuarioService } from '../serviços/usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html',
  styleUrls: ['./cadastro-setor.component.css']
})
export class CadastroSetorComponent implements OnInit {

  nome: string;
  usuarios: Usuario[];
  usuarioSelecionado: Usuario;
  msgErro: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService, private setorService: SetorService, private location: Location) {}

  siape:string;

  ngOnInit() {
    this.getUsuarios();
    this.siape=sessionStorage.getItem("siape");
  }

  cadastrarSetor(){
    if(this.nome != null && this.nome.length >= 5 && this.usuarioSelecionado != null){
      if(this.setorService.getSetorPorNome(this.nome)){
        this.msgErro = true;
      }else{
        this.setorService.setSetor(this.nome, this.usuarioSelecionado);
        this.voltar();
      }
    }
  }

  voltar(){
    this.location.back();
  }

  mostrarMsg(){
    this.msgErro = false;
  }

  getUsuarios(){
    this.usuarios = this.usuarioService.getUsuarios();
  }
}
