import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

import {FormsModule} from '@angular/forms';
import{RouterModule, Routes} from '@angular/router';

import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import { HomeComponent } from './home/home.component';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {SidebarModule} from 'primeng/sidebar';

export const rotas: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
