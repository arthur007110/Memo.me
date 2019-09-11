import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { UsuarioService } from '../serviços/usuario.service';
import { MemorandoService } from '../serviços/memorando.service';

@Component({
  selector: 'app-vizualicao-de-memorando',
  templateUrl: './vizualicao-de-memorando.component.html',
  styleUrls: ['./vizualicao-de-memorando.component.css']
})
export class VizualicaoDeMemorandoComponent implements OnInit {
  idMemorando: any;
  memorando: any;
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService, private memorandoService: MemorandoService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.idMemorando = this.config.data.id;
    this.getMemorando();
  }

  getMemorando(){
    this.memorandoService.listarPorId(this.idMemorando).subscribe(resultado => {
      this.memorando = resultado;
      this.getUsuarios();
    });
  }

  getUsuarios(){
    this.usuarioService.listarPorSetor(this.memorando.idSetorDestinatario).subscribe(resultado => {
      this.usuarios = resultado;
    });
  }

  getEstadoDeVizualizacao(siape){
    if(this.memorando.usuariosQueVizualizaram.includes(siape)){
      return "Vizualizado"
    }else{
      return "Não vizualizado"
    }
  }

}
