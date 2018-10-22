import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoMemorandoComponent } from './exibicao-memorando.component';

describe('ExibicaoMemorandoComponent', () => {
  let component: ExibicaoMemorandoComponent;
  let fixture: ComponentFixture<ExibicaoMemorandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoMemorandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoMemorandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
