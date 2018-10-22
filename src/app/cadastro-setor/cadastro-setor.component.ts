import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetorService } from 'src/app/serviços/setor.service';


@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html',
  styleUrls: ['./cadastro-setor.component.css']
})
export class CadastroSetorComponent implements OnInit {
 HEAD
  nome: string;
  id: number;
  id2: number;
  constructor(private router: Router, private SetorService: SetorService) { }


  siape:string;


  ngOnInit() {
  }

  irParaTelaDeSetores(){
    this.router.navigate(["/setores"])
  }

  cadastrar(){
    if(this.verificarCampos()){
      if(this.SetorService.validadeID(this.id)==true){
        this.SetorService.setSetor(this.nome, this.id)
        alert("Setor já Cadastrado");
        this.irParaTelaHome();
      }

    }

  }
  irParaTelaHome(){
    this.router.navigate(['/home',this.siape]);

  }
  verificarCampos(){
    if(this.nome != null && this.id != null){
      if(this.id == this.id2){
        return true;
      }
        else{
          alert("Confira o campo das ID's");
          return false
        }
      }else{
        alert("Existem campos que ainda não foram preenchidos.");
        return false;
      
    }
  }
}