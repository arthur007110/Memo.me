import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemorandoService } from '../serviços/memorando.service';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../serviços/usuario.service';

@Component({
  selector: 'app-envio-memorando',
  templateUrl: './envio-memorando.component.html',
  styleUrls: ['./envio-memorando.component.css'],
  providers: [MessageService]
})
export class EnvioMemorandoComponent implements OnInit {
  id: string;
  setores:Setor[];
  emissor:string;
  destinatario:Setor;
  mensagem:string;

  constructor(private router: Router, 
              private memorandoS: MemorandoService, 
              private setorS: SetorService, 
              private messageService: MessageService, 
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.id = sessionStorage.getItem('id-usuario');
    this.receberSetores();
  }


  enviarMemorando(){
    // FALTA COLOCAR O TOAST. VAI ALERT POR ENQUANTO MESMO
    this.usuarioService.listarPorId(this.id).subscribe(resultado => {
      let verificacao = this.memorandoS.verificacaoEnviarMemorando(this.destinatario, resultado, this.mensagem);
      if(verificacao == 0){
        sessionStorage.setItem('toast','10')
        this.irParaTelaHome();
      }else if(verificacao == 1){
        this.mostrarErro(5);
      }
    });
  }

  mostrarErro(erro){

    if(erro==5){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'preencha todos os campos.'});
    }else if(erro=='~'){
      
    }

  }

  irParaTelaHome(){
    this.router.navigate(['/recebidos', this.id]);
  }

  /*receberSetores(){
    this.setores = [];
    let setoresCadastrados;
    this.setorS.listarTodos().subscribe(setorArr => {
      setoresCadastrados = setorArr;
      //Excluindo o seu própio setor da lista

      for(let i = 0; i < setoresCadastrados.length; i++){
        if(setoresCadastrados[i].usuario.siape != this.siape){
          this.setores.push(setoresCadastrados[i]);
        }
      }
    });
  }*/

  receberSetores(){
    this.setorS.listarTodos().subscribe(resultado => {
      this.setores = resultado;
      let i = this.setores.length;
      let j = 0;
      while(j != i){
        if(this.setores[j].idDoUsuario == this.id){
          this.setores.splice(j, 1);
          --i;
        }else{
          j++;
         
        }
      }
    });
  }
}
