import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SetorService } from '../serviços/setor.service';

@Component({
  selector: 'app-atualizar-setor',
  templateUrl: './atualizar-setor.component.html',
  styleUrls: ['./atualizar-setor.component.css']
})
export class AtualizarSetorComponent implements OnInit {
  id: string;
  nome = "";
  setorSelecionado;
  novoNome: string = "";
  msgErro: boolean = false;
  
  constructor(private router: Router, private setorService: SetorService, private route: ActivatedRoute) { }

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
       this.voltar();
      }else if(verificacao == 1){
        alert("Preencha todos os campos.");
      }else if(verificacao == 2){
        alert("Nome inválido.");
      }else if(verificacao == 3){
        this.msgErro = true;
      }
    });
  }

  voltar(){
    this.router.navigate(['/listar-setores', this.id]);
  }

  mostrarMsg(){
    this.msgErro = false;
  }

}
