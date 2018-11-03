import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Memorando } from '../models/Memorando';
import { MemorandoService } from '../serviços/memorando.service';
import { UsuarioService } from '../serviços/usuario.service';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-exibir-memorandos-enviados',
  templateUrl: './exibir-memorandos-enviados.component.html',
  styleUrls: ['./exibir-memorandos-enviados.component.css']
})
export class ExibirMemorandosEnviadosComponent implements OnInit {

  constructor(private router: Router,
    private memorandoS: MemorandoService,
    private usuarioS: UsuarioService) { }

    siape:string;
    memorandos:Memorando[];
    usuario:Usuario;

    exibirMemorando(memorando){
        sessionStorage.setItem("id",memorando.getId());
        this.router.navigate(['vizualizar-enviado/',memorando.getId()]);
    }
    
    listarMemorandos(){
        this.memorandos=this.memorandoS.getMemorandosEnviadosSetor(this.usuario.getsetor());
    }

    reconhecerUsuario(){
        this.usuario=this.usuarioS.getUsuariosPorSiape(this.siape);
    }

    ngOnInit(){

        this.siape = sessionStorage.getItem("siape");
        this.reconhecerUsuario();
        this.listarMemorandos();
    }
}