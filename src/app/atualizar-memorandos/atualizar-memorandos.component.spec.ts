import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarMemorandosComponent } from './atualizar-memorandos.component';

describe('AtualizarMemorandosComponent', () => {
  let component: AtualizarMemorandosComponent;
  let fixture: ComponentFixture<AtualizarMemorandosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarMemorandosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarMemorandosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
