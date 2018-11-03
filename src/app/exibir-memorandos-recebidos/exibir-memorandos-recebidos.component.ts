import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Memorando } from '../models/Memorando';
import { MemorandoService } from '../serviços/memorando.service';
import { UsuarioService } from '../serviços/usuario.service';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-exibir-memorandos-recebidos',
  templateUrl: './exibir-memorandos-recebidos.component.html',
  styleUrls: ['./exibir-memorandos-recebidos.component.css']
})
export class ExibirMemorandosRecebidosComponent implements OnInit {

  constructor(
      private router: Router,
      private memorandoS: MemorandoService,
      private usuarioS: UsuarioService) { }

    siape:string;
    memorandos:Memorando[];
    usuario:Usuario;

    exibirMemorando(memorando){
        sessionStorage.setItem("id",memorando.getId());
        this.router.navigate(['/vizualizar',memorando.getId()]);
    }

    listarMemorandos(){
        this.memorandos=this.memorandoS.getMemorandosRecebidosSetor(this.usuario.getsetor());
    }

    reconhecerUsuario(){
        this.usuario=this.usuarioS.getUsuariosPorSiape(this.siape);
    }

    listarSetores(){
        this.router.navigate(['/listagem-setores-de-usuario/', this.siape]);
    }

    ngOnInit(){

        this.siape = sessionStorage.getItem("siape");
        this.reconhecerUsuario();
        this.listarMemorandos();
    }
}