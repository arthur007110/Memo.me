import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html',
  styleUrls: ['./cadastro-setor.component.css'],
  providers: [MessageService]
})
export class CadastroSetorComponent implements OnInit {
  nome: string;
  msgErro: boolean = false;

  constructor(private router: Router, 
    private setorService: SetorService, 
    private messageService: MessageService,){}

  ngOnInit(){

  }

  cadastrar(){
    let setor = new Setor("", this.nome);
    if(setor.verificarCampos()){
      this.setorService.cadastrar(setor).subscribe(resultado => {
        if(resultado){
          sessionStorage.setItem('toast','12');
          this.voltar();
        }else{
          this.messageService.add({severity:'error', summary: 'Erro!', detail:'este nome já está sendo utilizado.'});
        }
      })
    }else{
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'preencha todos os campos corretamente.'});
    }
  }

  //Volta para o tela de listagem de setores
  voltar(){
    let timeLeft: number = 1;
    let interval;

    interval = setInterval(() => {
      if(timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        this.router.navigate(['listar-setores/',sessionStorage.getItem('id-usuario')]);
      }
    },500);
  }

  mostrarMsg(){
    this.msgErro = false;
  }
}