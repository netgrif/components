import { TestBed } from '@angular/core/testing';

import { FieldConvertorService } from './field-convertor.service';

describe('FieldConvertorService', () => {
  let service: FieldConvertorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldConvertorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
