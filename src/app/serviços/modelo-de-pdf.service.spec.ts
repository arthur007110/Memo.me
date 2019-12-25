import { TestBed } from '@angular/core/testing';

import { ModeloDePdfService } from './modelo-de-pdf.service';

describe('ModeloDePdfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModeloDePdfService = TestBed.get(ModeloDePdfService);
    expect(service).toBeTruthy();
  });
});
