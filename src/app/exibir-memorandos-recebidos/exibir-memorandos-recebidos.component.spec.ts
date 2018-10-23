import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirMemorandosRecebidosComponent } from './exibir-memorandos-recebidos.component';

describe('ExibirMemorandosRecebidosComponent', () => {
  let component: ExibirMemorandosRecebidosComponent;
  let fixture: ComponentFixture<ExibirMemorandosRecebidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibirMemorandosRecebidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirMemorandosRecebidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
