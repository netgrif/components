import { TestBed } from '@angular/core/testing';

import { CaseHeaderService } from './case-header.service';

describe('CaseHeaderService', () => {
  let service: CaseHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
