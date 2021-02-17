import { TestBed } from '@angular/core/testing';

import { SearchKeywordResolverService } from './search-keyword-resolver.service';

describe('SearchKeywordResolverService', () => {
  let service: SearchKeywordResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchKeywordResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
