import { TestBed } from '@angular/core/testing';

import { ViewIdService } from './view-id.service';

describe('ViewIdService', () => {
  let service: ViewIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
