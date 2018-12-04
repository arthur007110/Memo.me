import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetorService } from 'src/app/serviços/setor.service';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../serviços/usuario.service';
import { Setor } from '../models/Setor';


@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html',
  styleUrls: ['./cadastro-setor.component.css']
})
export class CadastroSetorComponent implements OnInit {
  id: string;
  nome: string;
  usuarios = [];
  msgErro: boolean = false;
  texto: string;
  resultados: string[] = [];

  constructor(private router: Router, private usuarioService: UsuarioService, private setorService: SetorService){}

  ngOnInit(){
    this.getUsuarios();
    this.id = sessionStorage.getItem('id-usuario');
  }

  buscar(event){
    let arr = [];
    for(let i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].siape.indexOf(event.query) != -1){
        arr.push(this.usuarios[i].siape);
      }
    }

    this.resultados = arr;
  }

  getResultados(){
    if(this.resultados.length == 0){
      for(let i = 0; i < this.usuarios.length; i++){
        this.resultados.push(this.usuarios[i].siape);
      }
    }

    console.log(this.resultados);
  }

  cadastrar(){
    if(this.resultados.length == 1 && this.nome != undefined && this.nome.length > 0){
      //Pega o id do usuário
      let setor: Setor;
      for(let i = 0; i < this.usuarios.length; i++){
        if(this.usuarios[i].siape == this.resultados[0]){
          setor = new Setor("", this.nome, this.usuarios[i].id);
          break;
        }
      }
      //Tenta cadastrar no banco
      this.setorService.verificarCadastro(setor).subscribe(resultado => {
        if(resultado){
          alert('Cadastro realizado com sucesso');
          this.executarTimer();
        }else{
          alert('Este nome já está sendo utilizado.');
        }
      });
    }else{
      alert('Preencha todos os campos corretamente');
    }
  }

  executarTimer(){

    let timeLeft: number = 1;
    let interval;

    interval = setInterval(() => {
      if(timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        this.router.navigate(['listar-setores/',this.id]);
      }
    },1000);
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