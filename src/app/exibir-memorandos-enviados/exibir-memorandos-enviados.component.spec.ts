import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirMemorandosEnviadosComponent } from './exibir-memorandos-enviados.component';

describe('ExibirMemorandosEnviadosComponent', () => {
  let component: ExibirMemorandosEnviadosComponent;
  let fixture: ComponentFixture<ExibirMemorandosEnviadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibirMemorandosEnviadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirMemorandosEnviadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
