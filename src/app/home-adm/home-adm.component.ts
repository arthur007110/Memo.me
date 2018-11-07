import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../serviços/usuario.service';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-home-adm',
  templateUrl: './home-adm.component.html',
  styleUrls: ['./home-adm.component.css']
})
export class HomeAdmComponent implements OnInit {

  siape: string;
  private sub: any;
  usuario: Usuario;
  busca:String;

  items: MenuItem[];

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {

    
    this.sub = this.route.params.subscribe(params => {
      this.siape = params['id'];
    });

    this.getUsuario();
    
    this.items = [
      {
        label: 'Opções',
        items: [
          {label: 'Cadastar Setor', routerLink: ['/cadastro-setor']},
          {label: 'Listar Setores', routerLink: ['/listar-setores', this.siape]}]
      }
    ];

  }

  getUsuario(){
    this.usuario = this.usuarioService.getUsuariosPorSiape(this.siape);
  }

  deslogar(){
    sessionStorage.removeItem("siape");
    this.router.navigate(['']);
  }

  buscar(){
    //ainda sem funcionalidade
    console.log("ainda sem funcionalidade");
  }

}
