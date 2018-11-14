import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Memorando } from '../models/Memorando';
import { MemorandoService } from '../serviços/memorando.service';
import { UsuarioService } from '../serviços/usuario.service';
import { Usuario } from '../models/Usuario';
import { SetorService } from '../serviços/setor.service';

@Component({
  selector: 'app-exibir-memorandos-enviados',
  templateUrl: './exibir-memorandos-enviados.component.html',
  styleUrls: ['./exibir-memorandos-enviados.component.css']
})
export class ExibirMemorandosEnviadosComponent implements OnInit {

    siape:string;
    memorandos:Memorando[];
    usuario: Usuario;

    constructor(
        private router: Router,
        private memorandoS: MemorandoService,
        private usuarioS: UsuarioService,
        private setorS: SetorService) { }

    ngOnInit(){
        this.siape = sessionStorage.getItem("siape");
        this.reconhecerUsuario();
        this.listarMemorandos();
    }

    getNomeDoSetorDeDestino(id){
        let setor;
        this.setorS.listarPorId(id).subscribe(resultado => {
            setor = resultado;
            return setor.nome;
        });
    }

    exibirMemorando(memorando){
        sessionStorage.setItem("id",memorando.getId());
        this.router.navigate(['vizualizar-enviado/',memorando.getId()]);
    }
    
    listarMemorandos(){
        this.memorandos=this.memorandoS.getMemorandosEnviadosSetor(this.usuario.idDoSetor);
    }

    reconhecerUsuario(){
        this.usuarioS.listarTodos().subscribe(userArr => {
            for(let i = 0; i < userArr.length; i++){
                if(userArr[i].siape == this.siape){
                    this.usuario = userArr[i];
                }
            }
        });
    }
}