import { TestBed } from '@angular/core/testing';

import { ActiveGroupService } from './active-group.service';

describe('ActiveGroupService', () => {
  let service: ActiveGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
