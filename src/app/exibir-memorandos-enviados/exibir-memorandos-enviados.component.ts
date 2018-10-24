import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Memorando } from '../models/Memorando';
import { MemorandoService } from '../serviços/memorando.service';
import { SetorService } from '../serviços/setor.service';
import { Setor } from '../models/Setor';
import { UsuarioService } from '../serviços/usuario.service';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-exibir-memorandos-enviados',
  templateUrl: './exibir-memorandos-enviados.component.html',
  styleUrls: ['./exibir-memorandos-enviados.component.css']
})
export class ExibirMemorandosEnviadosComponent implements OnInit {

  constructor(private router: Router, private memorandoS: MemorandoService, private setorS: SetorService, private usuarioS: UsuarioService) { }

    items: MenuItem[];
    siape:string;
    memorandos:Memorando[];
    setores:Setor[];
    usuario:Usuario;

    deslogar(){
        this.router.navigate(['/login']);
    }
    enviarMemorando(){
        this.router.navigate(['/envio-memorando']);
    }
    exibirMemorando(i){
        sessionStorage.setItem("id",this.memorandos[i].getId());
        this.router.navigate(['vizualizar-enviado/',this.memorandos[i].getId()]);

    }
    mostrarMemorandosEnviados(){
        this.router.navigate(['enviados',this.siape]);
    }
    mostrarMemorandosRecebidos(){
        this.router.navigate(['recebidos',this.siape]);
    }
    listarMemorandos(){

    this.memorandos=this.memorandoS.getMemorandosEnviadosSetor(this.usuario.getsetor());

    }

    reconhecerUsuario(){
        this.usuario=this.usuarioS.getUsuariosPorSiape(this.siape);
    }

    listarSetores(){

    }
    atualizarSetor(){

    }
    cadastrarSetor(){
        this.router.navigate(['/cadastro-setor']);
    }
    ngOnInit(){

        this.siape = sessionStorage.getItem("siape");
        this.reconhecerUsuario();
        this.listarMemorandos();
        

        this.items = [
            {
                label: 'Memorando',
                items: [
                    {label: 'Enviar',
                    command: (event: Event) => {this.enviarMemorando();}},
                    {label: 'Mostrar Enviados',
                    command: (event: Event) => { this.mostrarMemorandosEnviados();}},
                    {label: 'Mostrar Recebidos',
                    command: (event: Event) => { this.mostrarMemorandosRecebidos();}}
                ]
            },
            {
                label: 'Setor',
                icon: '',
                items: [
                    {label: 'Cadastrar Setor',
                    icon: 'pi pi-fw pi-plus',
                    command: (event: Event) => { this.cadastrarSetor(); }},
                    {label: 'Listar Setores',
                    icon: 'pi pi-fw pi-pencil',
                    command: (event: Event) => { }},
                    {label: 'Atualizar Dados do Setor',
                    icon: 'pi pi-fw pi-refresh',
                    command: (event: Event) => { }}
                ]
            }
        ];
        
    }
}