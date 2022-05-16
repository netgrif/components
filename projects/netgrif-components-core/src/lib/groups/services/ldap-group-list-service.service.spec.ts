import { TestBed } from '@angular/core/testing';

import { LdapGroupListService } from './ldap-group-list.service';

describe('LdapGroupListService', () => {
  let service: LdapGroupListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LdapGroupListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
