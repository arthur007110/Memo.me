import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SetorService } from '../serviços/setor.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-atualizar-setor',
  templateUrl: './atualizar-setor.component.html',
  styleUrls: ['./atualizar-setor.component.css'],
  providers: [MessageService]
})
export class AtualizarSetorComponent implements OnInit {
  id: string;
  nome = "";
  setorSelecionado;
  novoNome: string = "";
  msgErro: boolean = false;
  
  constructor(private router: Router, 
              private setorService: SetorService, 
              private route: ActivatedRoute,
              private messageService: MessageService,) { }

  ngOnInit() {
    let id;
    
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    this.setorService.listarPorId(id).subscribe(resultado => {
      this.setorSelecionado = resultado;
      this.nome = this.setorSelecionado.nome;
    });

    this.id = sessionStorage.getItem('id-usuario');
  }

  atualizarSetor(){
    // FALTA COLOCAR O TOAST. VAI ALERT POR ENQUANTO MESMO
    let id = this.setorSelecionado.id;
    let setores;
    this.setorService.listarTodos().subscribe(resultado => {
      setores = resultado;
      let verificacao = this.setorService.verificacaoDeAtualizar(id, this.setorSelecionado.nome, this.novoNome, setores);
      if(verificacao == 0){
        sessionStorage.setItem('toast','15');
       this.voltar();
      }else if(verificacao == 1){
        this.mostrarErro(17);
      }else if(verificacao == 2){
        this.mostrarErro(16);
      }else if(verificacao == 3){
        this.msgErro = true;
      }
    });
  }

  mostrarErro(erro){

    if(erro=='16'){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'este nome é invalido.'});
    }else if(erro=='17'){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'preencha todos os campos corretamente.'});
    }

  }

  voltar(){
    this.router.navigate(['/listar-setores', this.id]);
  }

  mostrarMsg(){
    this.msgErro = false;
  }

}
