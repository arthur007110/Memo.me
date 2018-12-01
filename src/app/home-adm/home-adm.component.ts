import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';

@Component({
  selector: 'app-home-adm',
  templateUrl: './home-adm.component.html',
  styleUrls: ['./home-adm.component.css']
})
export class HomeAdmComponent implements OnInit {
  id: string;
  usuario;
  busca:String;
  items: MenuItem[];

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.id = sessionStorage.getItem('id-usuario');

    /*
    let sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    */

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

  buscar(){
    //ainda sem funcionalidade
    console.log("ainda sem funcionalidade");
  }

}
