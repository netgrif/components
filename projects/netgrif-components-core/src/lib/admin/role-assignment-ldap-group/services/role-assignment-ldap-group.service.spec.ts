import { TestBed } from '@angular/core/testing';

import { RoleAssignmentLdapGroupService } from './role-assignment-ldap-group.service';

describe('RoleAssignmentLdapGroupServiceService', () => {
  let service: RoleAssignmentLdapGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleAssignmentLdapGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
