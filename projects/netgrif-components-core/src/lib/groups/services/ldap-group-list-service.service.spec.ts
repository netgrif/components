import { TestBed } from '@angular/core/testing';

import { LdapGroupListServiceService } from './ldap-group-list-service.service';

describe('LdapGroupListServiceService', () => {
  let service: LdapGroupListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LdapGroupListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
