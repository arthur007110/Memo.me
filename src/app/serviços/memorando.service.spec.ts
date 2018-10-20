import { TestBed, inject } from '@angular/core/testing';

import { MemorandoService } from './memorando.service';

describe('MemorandoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemorandoService]
    });
  });

  it('should be created', inject([MemorandoService], (service: MemorandoService) => {
    expect(service).toBeTruthy();
  }));
});
