import { TestBed } from '@angular/core/testing';

import { FilterRepository } from './filter.repository';

describe('FilterService', () => {
  let service: FilterRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
