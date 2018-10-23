import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemDeSetorComponent } from './listagem-de-setor.component';

describe('ListagemDeSetorComponent', () => {
  let component: ListagemDeSetorComponent;
  let fixture: ComponentFixture<ListagemDeSetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemDeSetorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemDeSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
