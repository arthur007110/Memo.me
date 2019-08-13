import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SetorService } from '../serviços/setor.service';
import { MessageService } from 'primeng/api';
import { Setor } from '../models/Setor';

@Component({
  selector: 'app-atualizar-setor',
  templateUrl: './atualizar-setor.component.html',
  styleUrls: ['./atualizar-setor.component.css'],
  providers: [MessageService]
})
export class AtualizarSetorComponent implements OnInit {
  nome = "";
  setorSelecionado;
  novoNome: string = "";
  msgErro: boolean = false;
  
  constructor(private router: Router, 
    private setorService: SetorService, 
    private route: ActivatedRoute, 
    private messageService: MessageService,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getSetor(params['id']);
    });
  }

  //Procura no banco o setor que será atualizado
  getSetor(id){
    this.setorService.listarPorId(id).subscribe(resultado => {
      this.setorSelecionado = resultado;
      this.nome = this.setorSelecionado.nome;
    });
  }

  //Tenta atualizar o setor
  atualizar(){
    if(this.nome == this.novoNome){
      this.voltar();
    }
    let setor = new Setor(this.setorSelecionado.id, this.novoNome);
    if(setor.verificarCampos()){
      this.setorService.atualizar(setor).subscribe(resultado => {
        if(resultado){
          sessionStorage.setItem('toast','15');
          this.voltar();
        }else{
          this.msgErro = true;
        }
      })
    }else{
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'preencha todos os campos corretamente.'});
    }
  }

  //Volta para a tela de listagem de setor
  voltar(){
    this.router.navigate(['/listar-setores',sessionStorage.getItem('id-usuario')]);
  }

  mostrarMsg(){
    this.msgErro = false;
  }
}
