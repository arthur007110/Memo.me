import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/serviços/usuario.service';


@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html',
  styleUrls: ['./cadastro-setor.component.css']
})
export class CadastroSetorComponent implements OnInit {
 HEAD
  nome: string;
  id: string;
  constructor(private router: Router, private usuarioService: UsuarioService) { }


  siape:string;


  ngOnInit() {
    this.siape=sessionStorage.getItem("siape");
  }

  irParaTelaDeSetores(){
    this.router.navigate(["/setores"])
  }

  cadastrar(){

  }
  irParaTelaHome(){
    this.router.navigate(['/home',this.siape]);

  }
}
