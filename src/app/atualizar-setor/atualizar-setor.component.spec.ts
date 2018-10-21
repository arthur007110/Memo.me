import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarSetorComponent } from './atualizar-setor.component';

describe('AtualizarSetorComponent', () => {
  let component: AtualizarSetorComponent;
  let fixture: ComponentFixture<AtualizarSetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarSetorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
