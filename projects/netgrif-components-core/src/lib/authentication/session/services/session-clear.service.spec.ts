import { TestBed } from '@angular/core/testing';

import { SessionClearService } from './session-clear.service';

describe('SessionClearService', () => {
  let service: SessionClearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionClearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
