import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro-usuario/cadastro.component';

import {FormsModule} from '@angular/forms';
import{RouterModule, Routes} from '@angular/router';

import {PasswordModule} from 'primeng/password';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {CardModule} from 'primeng/card';
import { HomeComponent } from './home/home.component';
import {MenubarModule} from 'primeng/menubar';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';


import { CadastroSetorComponent } from './cadastro-setor/cadastro-setor.component';
import { EnvioMemorandoComponent } from './envio-memorando/envio-memorando.component';
import { UsuarioService } from './serviços/usuario.service';
//import { AtualizarMemorandosComponent } from './atualizar-memorandos/atualizar-memorandos.component';
import { AtualizarSetorComponent } from './atualizar-setor/atualizar-setor.component';
import { HomeAdmComponent } from './home-adm/home-adm.component';
import {TableModule} from 'primeng/table';

export const rotas: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'cadastro-setor', component: CadastroSetorComponent},
  { path: 'envio-memorando', component: EnvioMemorandoComponent},
  { path: 'home-adm/:id', component: HomeAdmComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    CadastroSetorComponent,
    EnvioMemorandoComponent,
    //AtualizarMemorandosComponent,
    AtualizarSetorComponent,
    HomeAdmComponent
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
    InputTextareaModule,
    BrowserAnimationsModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    TableModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
