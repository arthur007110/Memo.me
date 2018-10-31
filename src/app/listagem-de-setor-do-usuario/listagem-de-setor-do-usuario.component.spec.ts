import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemDeSetorDoUsuarioComponent } from './listagem-de-setor-do-usuario.component';

describe('ListagemDeSetorDoUsuarioComponent', () => {
  let component: ListagemDeSetorDoUsuarioComponent;
  let fixture: ComponentFixture<ListagemDeSetorDoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemDeSetorDoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemDeSetorDoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
