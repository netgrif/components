import { TestBed } from '@angular/core/testing';

import { SearchChipService } from './search-chip.service';

describe('SearchChipService', () => {
  let service: SearchChipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchChipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
