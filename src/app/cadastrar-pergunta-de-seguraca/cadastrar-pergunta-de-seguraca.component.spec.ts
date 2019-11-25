import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPerguntaDeSeguracaComponent } from './cadastrar-pergunta-de-seguraca.component';

describe('CadastrarPerguntaDeSeguracaComponent', () => {
  let component: CadastrarPerguntaDeSeguracaComponent;
  let fixture: ComponentFixture<CadastrarPerguntaDeSeguracaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPerguntaDeSeguracaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPerguntaDeSeguracaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
