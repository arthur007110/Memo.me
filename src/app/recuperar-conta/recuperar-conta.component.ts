import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { UsuarioService } from '../serviços/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-conta',
  templateUrl: './recuperar-conta.component.html',
  styleUrls: ['./recuperar-conta.component.css']
})
export class RecuperarContaComponent implements OnInit {
  perguntasDeSeguranca: SelectItem[];
  perguntaSelecionada: number = 1;
  respostaDeSeguranca: string;
  siape: string;

  constructor(private usuarioService: UsuarioService, private router: Router) { 
    this.perguntasDeSeguranca = [
      {label: 'Qual o seu filme/série favorito?', value: '1'},
      {label: 'Qual o nome do seu primeiro animal de estimação?', value: '2'},
      {label: 'Qual o nome de solteira de sua mãe?', value: '3'}
    ];
  }

  ngOnInit() {
  }

  continuar(){
    if(this.perguntaSelecionada == null || this.respostaDeSeguranca == null ||
      this.perguntaSelecionada == undefined || this.respostaDeSeguranca == undefined ||
      this.siape == null || this.siape == undefined || this.siape.length == 0){
        //Colocar um TOAST aqui
        alert('Todos os campos precisam estar corretamente preenchidos.');
    }else{
      this.usuarioService.loginComPerguntaDeSeguranca(this.siape, this.perguntaSelecionada, this.respostaDeSeguranca).subscribe(resultado => {
        if(resultado == 3){
          //Colocar um TOAST aqui
          alert('Erro!');
        }else{
          this.irParaTrocarASenha();
        }
      });
    }
    
  }

  irParaTrocarASenha(){
    this.usuarioService.listarTodos().subscribe(resultado => {
      for(let i = 0; i < resultado.length; i++){
        if(resultado[i].siape == this.siape){
          sessionStorage.setItem('id-usuario', resultado[i].id);
          this.router.navigate(["/trocar-senha/", resultado[i].id]);
        }
      }
    });
  }
}
