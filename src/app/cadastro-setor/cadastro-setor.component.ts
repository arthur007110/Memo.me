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
  id: string;
  nome: string;
  usuarios: Usuario[] = [];
  usuarioSelecionado: Usuario;
  msgErro: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService, private setorService: SetorService){}

  ngOnInit(){
    this.getUsuarios();
    this.id = sessionStorage.getItem('id-usuario');
  }

  cadastrarSetor(){
    // FALTA COLOCAR O TOAST. VAI ALERT POR ENQUANTO MESMO
    let setores;
    this.setorService.listarTodos().subscribe(resultado => {
      setores = resultado;
      let verificacao = this.setorService.verificacaoDeCadastro(this.nome, this.usuarioSelecionado, setores);
      if(verificacao == 0){
        this.router.navigate(['/listar-setores', this.id]);
      }else if(verificacao == 1){
        alert("Preencha todos os campos.");
      }else if(verificacao == 2){
        alert("Nome inválido.");
      }else if(verificacao == 3){
        this.msgErro = true;
      }
    });
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
        if(this.usuarios[j].idDoSetor == null && this.usuarios[j].siape != "0000000"){
          j++;
        }else{
          this.usuarios.splice(j, 1);
          --i;
        }
      }
    });
  }
}