import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarModeloDeMemorandoComponent } from './atualizar-modelo-de-memorando.component';

describe('AtualizarModeloDeMemorandoComponent', () => {
  let component: AtualizarModeloDeMemorandoComponent;
  let fixture: ComponentFixture<AtualizarModeloDeMemorandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarModeloDeMemorandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarModeloDeMemorandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
