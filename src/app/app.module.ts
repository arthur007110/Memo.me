import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

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
import {TableModule} from 'primeng/table';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToastModule} from 'primeng/toast';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {EditorModule} from 'primeng/editor';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DialogModule} from 'primeng/dialog';
import {SpinnerModule} from 'primeng/spinner';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro-usuario/cadastro.component';
import { CadastroSetorComponent } from './cadastro-setor/cadastro-setor.component';
import { EnvioMemorandoComponent } from './envio-memorando/envio-memorando.component';
import { UsuarioService } from './serviços/usuario.service';
import { AtualizarSetorComponent } from './atualizar-setor/atualizar-setor.component';
import { HomeAdmComponent } from './home-adm/home-adm.component';
import { ExibicaoMemorandoComponent } from './exibicao-memorando/exibicao-memorando.component';
import { ExibirMemorandosRecebidosComponent } from './exibir-memorandos-recebidos/exibir-memorandos-recebidos.component';
import { ExibirMemorandosEnviadosComponent } from './exibir-memorandos-enviados/exibir-memorandos-enviados.component';
import { ListagemDeSetorComponent } from './listagem-de-setor/listagem-de-setor.component';
import { ExibicaoMemorandoEnviadoComponent } from './exibicao-memorando-enviado/exibicao-memorando-enviado.component';
import { ListagemDeSetorDoUsuarioComponent } from './listagem-de-setor-do-usuario/listagem-de-setor-do-usuario.component';
import { SetorService } from './serviços/setor.service';
import { configuracao } from 'src/environments/firebase.config';
import { MemorandoService } from './serviços/memorando.service';
import { ListaDeMembrosDoSetorComponent } from './lista-de-membros-do-setor/lista-de-membros-do-setor.component';
import { VizualicaoDeMemorandoComponent } from './vizualicao-de-memorando/vizualicao-de-memorando.component';
import { AjudaComponent } from './ajuda/ajuda.component';
import { TrocarSenhaComponent } from './trocar-senha/trocar-senha.component';
import { RecuperarContaComponent } from './recuperar-conta/recuperar-conta.component';
import { CadastrarPerguntaDeSeguracaComponent } from './cadastrar-pergunta-de-seguraca/cadastrar-pergunta-de-seguraca.component';
import { CadastrarModeloDeMemorandoComponent } from './cadastrar-modelo-de-memorando/cadastrar-modelo-de-memorando.component';
import { AjudaPdfComponent } from './ajuda-pdf/ajuda-pdf.component';
import { ModeloDePdfService } from './serviços/modelo-de-pdf.service';
import { PdfService } from './serviços/pdf.service';
import { AtualizarModeloDeMemorandoComponent } from './atualizar-modelo-de-memorando/atualizar-modelo-de-memorando.component';

export const rotas: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: '', component: LoginComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'cadastro-setor', component: CadastroSetorComponent},
  { path: 'envio-memorando', component: EnvioMemorandoComponent},
  { path: 'home-adm/:id', component: HomeAdmComponent},
  { path: 'atualizar-setor/:id', component: AtualizarSetorComponent},
  { path: 'vizualizar/:id', component: ExibicaoMemorandoComponent},
  { path: 'vizualizar-enviado/:id', component: ExibicaoMemorandoEnviadoComponent},
  { path: 'recebidos/:id', component: ExibirMemorandosRecebidosComponent},
  { path: 'enviados/:id', component: ExibirMemorandosEnviadosComponent},
  { path: 'listar-setores-de-usuario/:id', component: ListagemDeSetorDoUsuarioComponent},
  { path: 'listar-setores/:id', component: ListagemDeSetorComponent},
  { path: 'trocar-senha/:id', component: TrocarSenhaComponent},
  { path: 'recuperar-conta', component: RecuperarContaComponent},
  { path: 'cadastrar-pds/:id', component: CadastrarPerguntaDeSeguracaComponent},
  { path: 'cadastrar-pdf/:id', component: CadastrarModeloDeMemorandoComponent},
  { path: 'atualizar-padrao/:id', component: AtualizarModeloDeMemorandoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    CadastroSetorComponent,
    EnvioMemorandoComponent,
    AtualizarSetorComponent,
    HomeAdmComponent,
    ExibicaoMemorandoComponent,
    ListagemDeSetorComponent,
    ExibirMemorandosRecebidosComponent,
    ExibirMemorandosEnviadosComponent,
    ExibicaoMemorandoEnviadoComponent,
    ListagemDeSetorDoUsuarioComponent,
    ListaDeMembrosDoSetorComponent,
    VizualicaoDeMemorandoComponent,
    AjudaComponent,
    TrocarSenhaComponent,
    RecuperarContaComponent,
    CadastrarPerguntaDeSeguracaComponent,
    CadastrarModeloDeMemorandoComponent,
    AjudaPdfComponent,
    AtualizarModeloDeMemorandoComponent,
    
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
    TableModule,
    ScrollPanelModule,
    ToggleButtonModule,
    ToastModule,
    AutoCompleteModule,
    CalendarModule,
    EditorModule,
    KeyFilterModule,
    DynamicDialogModule,
    OverlayPanelModule,
    DialogModule,
    SpinnerModule,
    AngularFireModule.initializeApp(configuracao)
  ],
  entryComponents: [
    ListaDeMembrosDoSetorComponent,
    VizualicaoDeMemorandoComponent,
    AjudaComponent,
    AjudaPdfComponent
  ],
  providers: [UsuarioService, SetorService, MemorandoService, ModeloDePdfService, PdfService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }