import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarModeloDeMemorandoComponent } from './cadastrar-modelo-de-memorando.component';

describe('CadastrarModeloDeMemorandoComponent', () => {
  let component: CadastrarModeloDeMemorandoComponent;
  let fixture: ComponentFixture<CadastrarModeloDeMemorandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarModeloDeMemorandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarModeloDeMemorandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
