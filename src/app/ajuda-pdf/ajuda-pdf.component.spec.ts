import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjudaPdfComponent } from './ajuda-pdf.component';

describe('AjudaPdfComponent', () => {
  let component: AjudaPdfComponent;
  let fixture: ComponentFixture<AjudaPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjudaPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjudaPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
