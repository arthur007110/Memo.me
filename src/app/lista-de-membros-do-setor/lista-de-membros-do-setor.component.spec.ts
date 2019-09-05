import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeMembrosDoSetorComponent } from './lista-de-membros-do-setor.component';

describe('ListaDeMembrosDoSetorComponent', () => {
  let component: ListaDeMembrosDoSetorComponent;
  let fixture: ComponentFixture<ListaDeMembrosDoSetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeMembrosDoSetorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeMembrosDoSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
