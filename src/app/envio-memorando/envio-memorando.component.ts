import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemorandoService } from '../serviços/memorando.service';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../serviços/usuario.service';
import { EmailServiceService } from '../serviços/email-service.service';

@Component({
  selector: 'app-envio-memorando',
  templateUrl: './envio-memorando.component.html',
  styleUrls: ['./envio-memorando.component.css'],
  providers: [MessageService]
})
export class EnvioMemorandoComponent implements OnInit {
  id: string;
  usuario;
  setores:Setor[];
  emissor:string;
  mensagem:string;
  assunto:string;
  setorEscolhido: any;
  texto: string = null;
  resultados: string[] = [];

  constructor(private router: Router, 
    private memorandoS: MemorandoService, 
    private setorS: SetorService, 
    private messageService: MessageService, 
    private usuarioService: UsuarioService,
    private emailService: EmailServiceService) { }

  ngOnInit() {
    this.id = sessionStorage.getItem('id-usuario');
    this.receberSetores();
    this.receberUsuario();
  }

  //Atualiza o array resultado conforme a entrada do usuário
  buscar(event){
    let arr = [];
    for(let i = 0; i < this.setores.length; i++){
      if(this.setores[i].nome.indexOf(event.query) != -1){
        arr.push(this.setores[i].nome);
      }
    }
    this.resultados = arr;
    this.texto = event.query;
  }

  getIdDoSetorPorNome(nomeDoSetor){
    for(let i = 0; i < this.setores.length; i++){
      if(this.setores[i].nome == nomeDoSetor){
        return this.setores[i].id;
      }
    }
  }


  enviarMemorando(){
    let verificacao = this.memorandoS.verificacaoEnviarMemorando(this.getIdDoSetorPorNome(this.setorEscolhido.nome), this.usuario, this.mensagem, this.assunto);
    if(verificacao == 0){
      sessionStorage.setItem('toast','10')
      this.irParaTelaHome();
    }else if(verificacao == 1){
      this.mostrarErro(5);
    }else if(verificacao == 2){
      this.mostrarErro(6);
    }else if(verificacao == 3){
      this.mostrarErro(7);
    }else if(verificacao == 4){
      this.mostrarErro(8);
    }else if(verificacao == 5){
      this.mostrarErro(9);
    }else if(verificacao == 6){
      this.mostrarErro(10);
    }
  }

  mostrarErro(erro){
    if(erro==5){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'preencha o campo do destinatário.'});
    }if(erro==6){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'o login não é válido.'});
    }if(erro==7 || erro==8){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'a mensagem de corpo não pode estar vazia.'});
    }if(erro==9 || erro==10){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'o campo de assunto não pode estar vazio.'});
    }
    else if(erro=='~'){
      
    }

  }

  irParaTelaHome(){
    this.router.navigate(['/recebidos', this.id]);
  }

  receberUsuario(){
    this.usuarioService.listarPorId(this.id).subscribe(resultado => {
      this.usuario = resultado;
      
    });
  }
  receberSetores(){
    this.setorS.listarTodos().subscribe(resultado => {
      this.setores = resultado;
    });
  }

  /*
    Exclui do array setores o setor ao qual o usuário faz parte
  */
}