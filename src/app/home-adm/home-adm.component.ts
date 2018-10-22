import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Setor } from '../models/Setor';
import { SetorService } from '../serviços/setor.service';
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

  items: MenuItem[];
  setores: Setor[];
  colunas: any[];

  constructor(private router: Router, private setorService: SetorService, private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.siape = params['id'];
    });

    this.getSetores();
    this.getUsuario();
    
    this.items = [
      {label: 'Cadastar Setor', routerLink: ['/cadastro-setor']},
      {label: 'Atualizar Setor', routerLink: ['/atualizar-setor']}
    ];

  }

  getSetores(){
    this.setores = this.setorService.getSetores();
  }

  getUsuario(){
    this.usuario = this.usuarioService.getUsuariosPorSiape(this.siape);
  }

  deslogar(){
    this.router.navigate(['/login']);
  }

}
