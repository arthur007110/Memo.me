import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';

@Component({
  selector: 'app-home-adm',
  templateUrl: './home-adm.component.html',
  styleUrls: ['./home-adm.component.css'],
  providers: [MessageService]
})
export class HomeAdmComponent implements OnInit {
  id: string;
  usuario;
  busca:String;
  items: MenuItem[];

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private usuarioService: UsuarioService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.id = sessionStorage.getItem('id-usuario');
    this.getUsuario();
    
    this.items = [
      {
        label: 'Opções',
        items: [
          {label: 'Cadastar Setor', routerLink: ['/cadastro-setor']},
          {label: 'Listar Setores', routerLink: ['/listar-setores', this.id]},
        {label: 'Cadastrar Usúario', routerLink: ['/cadastro']}]
      }
    ];

  }

  mostrarAviso() {
    this.messageService.add({key: 'c', sticky: true, severity:'success', summary:'Deseja relamente sair?', detail:'pressione o sim para sair'});
  }

  onConfirm() {
    this.messageService.clear('c');
    this.deslogar();
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

  getUsuario(){
    this.usuarioService.listarPorId(this.id).subscribe(resultado => {
      this.usuario = resultado;
    })
  }

  deslogar(){
    sessionStorage.removeItem("id-usuario");
    sessionStorage.removeItem("id-setor");
    sessionStorage.removeItem("id-memorando");
    this.router.navigate(['']);
  }

}
