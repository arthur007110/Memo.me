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
  getNomeDoSetorPorID(IdDoSetor){
    for(let i = 0; i < this.setores.length; i++){
      if(this.setores[i].id == IdDoSetor){
        return this.setores[i].nome;
      }
    }
  }
  getEmailsDosUsuariosDoSetor(){
    
    let usuarios: any[] = [];
    let emails = "";
    //console.log(this.getIdDoSetorPorNome(this.setorEscolhido.nome));
    this.usuarioService.listarPorSetor(this.getIdDoSetorPorNome(this.setorEscolhido.nome)).subscribe(resultado => {
      usuarios = resultado;
      for(let i=0; i<usuarios.length; i++){
        if(i == 0){
          emails += usuarios[i].email;
        }else{
          emails += ", "+usuarios[i].email;
        }
      }
      this.enviarEmail(emails);
    });

    
    
  }

  enviarMemorando(){
    let verificacao = this.memorandoS.verificacaoEnviarMemorando(this.getIdDoSetorPorNome(this.setorEscolhido.nome), this.usuario, this.mensagem, this.assunto);
    if(verificacao == 0){
      sessionStorage.setItem('toast','10')
      this.irParaTelaHome();
      this.getEmailsDosUsuariosDoSetor();
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
  enviarEmail(emails){
    let data = {
    from: 'sender@server.com',
    to: emails,
    subject: 'Você Recebeu um novo memorando!',
    text: 'cheque nos seus memorandos recebidos',
    html: '"<h2 style=\"text-align: center;\"><span style=\"color: #008000;\">Voc&ecirc; acaba de receber um memorando!</span></h2> <p style=\"text-align: center;\"><em><strong>Sobre:&nbsp;<span style=\"color: #339966;\">"'+this.assunto+'"</span></strong></em> <h3 style=\"text-align: center;\">para visualizar, acesse: <span style=\"background-color: #ccffcc; color: #00ff00;\"><a style=\"background-color: #ccffcc; color: #00ff00;\" href=\"https://sistema-memorandos.firebaseapp.com/\"><span style=\"color: #008000;\">Memo.me</span></a></span>, e busque em seus <span style=\"color: #008000;\">memorandos recebidos</span></h3> <p style=\"text-align: center;\">&nbsp;</p> <p style=\"text-align: center;\"><img src=\"https://i.imgur.com/kbmt40z.png\" alt=\"Memo.me\" border=\"0\" width=\"17%\" height=\"15%\"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src=\"https://i.imgur.com/V1f5OWB.png\" border=\"0\"  width=\"15%\" height=\"15%\">&nbsp;</p>"'
    };

    this.emailService.enviaremail(data);

  }
  /*
    Exclui do array setores o setor ao qual o usuário faz parte
  */
}