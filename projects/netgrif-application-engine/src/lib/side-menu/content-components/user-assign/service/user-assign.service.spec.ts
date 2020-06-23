import { TestBed } from '@angular/core/testing';

import {UserAssignService} from './user-assign.service';

describe('UserAssignService', () => {
  let service: UserAssignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAssignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
