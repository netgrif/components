import { TestBed } from '@angular/core/testing';

import { PublicCaseResourceService } from './public-case-resource.service';

describe('PublicCaseResourceService', () => {
  let service: PublicCaseResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicCaseResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
