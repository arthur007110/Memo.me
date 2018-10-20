import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioMemorandoComponent } from './envio-memorando.component';

describe('EnvioMemorandoComponent', () => {
  let component: EnvioMemorandoComponent;
  let fixture: ComponentFixture<EnvioMemorandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioMemorandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioMemorandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
