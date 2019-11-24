import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { MessageService, DialogService } from 'primeng/api';
import { AjudaComponent } from '../ajuda/ajuda.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService, DialogService]
})
export class LoginComponent implements OnInit {
  siape: string;
  senha: string;

  constructor(private router: Router, 
    private usuarioService: UsuarioService, 
    private messageService: MessageService,
    public dialogService: DialogService) { }

  ngOnInit(){
    let toast = sessionStorage.getItem('toast');
    this.executarTimer(toast);
  }

  mostrarToast(toast){
    if(toast=='11'){
        this.messageService.add({severity:'success', summary: 'Deslogado!', detail:'Deslogado com sucesso!'});
        sessionStorage.removeItem('toast');
    }
  }

  executarTimer(toast){
    let timeLeft: number = 1;
    let interval;

    interval = setInterval(() => {
      if(timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
        this.mostrarToast(toast);
      }
    },200);
  }

  logar(){
    this.usuarioService.verificarLogin(this.siape, this.senha).subscribe(resultado => {
      if(resultado == 1){
        this.mostrarErro(3);
      }else if(resultado == 2){
        if(this.siape == "0000000"){
          sessionStorage.setItem('toast','1');
          this.irParaTelaHomeAdm();
        }else{
          sessionStorage.setItem('toast','2');
          this.irParaTelaHome();
        }
      }else{
        this.mostrarErro(4);
      }
    });
  }

  mostrarErro(erro){
    if(erro==3){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Esse usuário ainda não possui um setor. Por favor contate o adm.'});
    }else if(erro==4){
      this.messageService.add({severity:'error', summary: 'Erro!', detail:'Login ou senha incorretos.'});
    }
  }

  irParaTelaHome(){
    this.usuarioService.listarTodos().subscribe(resultado => {
      for(let i = 0; i < resultado.length; i++){
        if(resultado[i].siape == this.siape){
          sessionStorage.setItem('id-usuario', resultado[i].id);
          this.router.navigate(["/recebidos", resultado[i].id]);
        }
      }
    });
  }
  
  irParaTelaHomeAdm(){
    this.usuarioService.listarTodos().subscribe(resultado => {
      for(let i = 0; i < resultado.length; i++){
        if(resultado[i].siape == this.siape){
          sessionStorage.setItem('id-usuario', resultado[i].id);
          this.router.navigate(["/listar-setores", resultado[i].id]);
        }
      }
    });
  }

  irParaRecuperarConta(){
    this.router.navigate(['recuperar-conta']);
  }

  mostrarAjuda(){
    const ref = this.dialogService.open(AjudaComponent, {
      header: 'Ajuda',
      width: '70%'
  });
  }
}
