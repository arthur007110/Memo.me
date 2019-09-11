import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualicaoDeMemorandoComponent } from './vizualicao-de-memorando.component';

describe('VizualicaoDeMemorandoComponent', () => {
  let component: VizualicaoDeMemorandoComponent;
  let fixture: ComponentFixture<VizualicaoDeMemorandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizualicaoDeMemorandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizualicaoDeMemorandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
