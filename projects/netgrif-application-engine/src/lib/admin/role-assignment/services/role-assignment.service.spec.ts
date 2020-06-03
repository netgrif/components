import { TestBed } from '@angular/core/testing';

import { RoleAssignmentService } from './role-assignment.service';

describe('RoleAssignmentService', () => {
  let service: RoleAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
