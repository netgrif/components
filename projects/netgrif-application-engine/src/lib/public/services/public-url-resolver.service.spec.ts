import { TestBed } from '@angular/core/testing';

import { PublicUrlResolverService } from './public-url-resolver.service';

describe('PublicUrlResolverService', () => {
  let service: PublicUrlResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicUrlResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
