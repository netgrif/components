import { TestBed } from '@angular/core/testing';

import { NextGroupService } from './next-group.service';

describe('GroupServiceService', () => {
  let service: NextGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
