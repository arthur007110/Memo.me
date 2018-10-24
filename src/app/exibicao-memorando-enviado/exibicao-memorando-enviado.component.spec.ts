import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoMemorandoEnviadoComponent } from './exibicao-memorando-enviado.component';

describe('ExibicaoMemorandoEnviadoComponent', () => {
  let component: ExibicaoMemorandoEnviadoComponent;
  let fixture: ComponentFixture<ExibicaoMemorandoEnviadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoMemorandoEnviadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoMemorandoEnviadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
