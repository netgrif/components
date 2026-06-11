import {TestBed} from '@angular/core/testing';

import {RoleModeService} from './role-mode.service';

describe('RoleModeService', () => {
  let service: RoleModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
