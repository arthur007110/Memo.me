import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import{RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro-usuario/cadastro.component';
import { CadastroSetorComponent } from './cadastro-setor/cadastro-setor.component';
import { EnvioMemorandoComponent } from './envio-memorando/envio-memorando.component';
import { AtualizarMemorandosComponent } from './atualizar-memorandos/atualizar-memorandos.component';
import { HomeComponent } from './home/home.component';


import { UsuarioService } from './serviços/usuario.service';

import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {CardModule} from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextareaModule} from 'primeng/inputtextarea';

<<<<<<< HEAD


=======
import { CadastroSetorComponent } from './cadastro-setor/cadastro-setor.component';
import { EnvioMemorandoComponent } from './envio-memorando/envio-memorando.component';
import { UsuarioService } from './serviços/usuario.service;
import { AtualizarMemorandosComponent } from './atualizar-memorandos/atualizar-memorandos.component;
import { AtualizarSetorComponent } from './atualizar-setor/atualizar-setor.component''';
>>>>>>> 81bc4e8406c1293ff6b580bbbc9cbfd4c02955e4

export const rotas: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'cadastro-setor', component: CadastroSetorComponent},
  { path: 'envio-memorando', component: EnvioMemorandoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    CadastroSetorComponent,
<<<<<<< HEAD
    EnvioMemorandoComponent,
    AtualizarMemorandosComponent
=======
    EnvioMemorandoComponen,
    AtualizarMemorandosComponent,
    AtualizarSetorComponentt
>>>>>>> 81bc4e8406c1293ff6b580bbbc9cbfd4c02955e4
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rotas),
    FormsModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    MenubarModule,
    SidebarModule,
    InputMaskModule,
    InputTextareaModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
