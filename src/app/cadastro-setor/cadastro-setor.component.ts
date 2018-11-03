import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetorService } from 'src/app/serviços/setor.service';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../serviços/usuario.service';


@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html',
  styleUrls: ['./cadastro-setor.component.css']
})
export class CadastroSetorComponent implements OnInit {

  nome: string;
  usuarios: Usuario[] = [];
  usuarioSelecionado: Usuario;
  msgErro: boolean = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private setorService: SetorService){}

  siape: string;

  ngOnInit(){
    this.getUsuarios();
    this.siape = sessionStorage.getItem("siape");
  }

  cadastrarSetor(){
    if(this.nome != null && this.usuarioSelecionado != null){
      if(this.setorService.getSetorPorNome(this.nome) != null){
        this.msgErro = true;
      }else{
        this.setorService.setSetor(this.nome, this.usuarioSelecionado);

        // Obtém o id do setor e do usuário
        let idDoSetor = this.setorService.getSetores().length;
        let idDoUsuario = this.usuarioSelecionado.getID();
        this.usuarioService.atualizaSetorDeUsuario(idDoUsuario, idDoSetor);
        this.router.navigate(['/listar-setores', this.siape]);
      }
    }
  }

  mostrarMsg(){
    this.msgErro = false;
  }

  getUsuarios(){
    this.usuarios = [];
    let usuariosCadastrados = this.usuarioService.getUsuarios();

    //Busca apenas os usuários que não possuem um setor cadastrado.
    for(let i = 0; i < usuariosCadastrados.length; i++){
      if(usuariosCadastrados[i].getsetor() == null){
        this.usuarios.push(usuariosCadastrados[i]);
      }
    }
  }
  
}