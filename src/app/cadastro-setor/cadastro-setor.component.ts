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
    // FALTA COLOCAR O TOAST. VAI ALERT POR ENQUANTO MESMO
    let verificacao = this.setorService.verificacaoDeCadastro(this.nome, this.usuarioSelecionado);
    if(verificacao == 0){
      this.router.navigate(['/listar-setores', this.siape]);
    }else if(verificacao == 1){
      alert("Preencha todos os campos.");
    }else if(verificacao == 2){
      alert("Nome inválido.");
    }else if(verificacao == 3){
      alert("Esse nome já está sendo utilizado.");
      this.msgErro = true;
    }
  }

  mostrarMsg(){
    this.msgErro = false;
  }

  getUsuarios(){
    this.usuarioService.listarTodos().subscribe(resultado => {
      this.usuarios = resultado;
      let i = this.usuarios.length;
      let j = 0;
      while(j != i){
        if(this.usuarios[j].idDoSetor == null){
          j++;
        }else{
          this.usuarios.splice(j, 1);
          --i;
        }
      }
    });
  }
}