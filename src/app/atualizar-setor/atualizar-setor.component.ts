import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SetorService } from '../serviços/setor.service';
import { Setor } from '../models/Setor';

@Component({
  selector: 'app-atualizar-setor',
  templateUrl: './atualizar-setor.component.html',
  styleUrls: ['./atualizar-setor.component.css']
})
export class AtualizarSetorComponent implements OnInit {
  siape: string;
  setorSelecionado: Setor = null;
  novoNome: string = "";
  msgErro: boolean = false;
  
  constructor(
    private router: Router,
    private setorService: SetorService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.params.subscribe(params => {
      this.setorSelecionado = this.setorService.getSetorPorId(params['id']);
    })
    this.siape = sessionStorage.getItem("siape");
  }

  atualizarSetor(){
    // FALTA COLOCAR O TOAST. VAI ALERT POR ENQUANTO MESMO
    let verificacao = this.setorService.verificacaoDeAtualizar(this.setorSelecionado.nome, this.novoNome);
    if(verificacao == 0){
      this.voltar();
    }else if(verificacao == 1){
      alert("Preencha todos os campos.");
    }else if(verificacao == 2){
      alert("Nome inválido.");
    }else if(verificacao == 3){
      alert("Esse nome já está sendo utilizado.");
      this.msgErro = true;
    }
  }

  voltar(){
    this.router.navigate(['/listar-setores', this.siape]);
  }

  mostrarMsg(){
    this.msgErro = false;
  }

}
