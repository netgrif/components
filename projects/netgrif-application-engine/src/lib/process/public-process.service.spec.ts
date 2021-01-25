import { TestBed } from '@angular/core/testing';

import { PublicProcessService } from './public-process.service';

describe('PublicProcessService', () => {
  let service: PublicProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
