import { TestBed } from '@angular/core/testing';

import { FilterExtractionService } from './filter-extraction.service';

describe('FilterExtractionService', () => {
  let service: FilterExtractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterExtractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
