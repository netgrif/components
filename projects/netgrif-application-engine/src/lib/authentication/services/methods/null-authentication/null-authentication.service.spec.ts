import { TestBed } from '@angular/core/testing';

import { NullAuthenticationService } from './null-authentication.service';

describe('NullAuthenticationService', () => {
  let service: NullAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NullAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
