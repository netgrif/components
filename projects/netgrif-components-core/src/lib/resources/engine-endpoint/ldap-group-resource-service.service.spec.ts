import { TestBed } from '@angular/core/testing';

import { LdapGroupResourceServiceService } from './ldap-group-resource-service.service';

describe('LdapGroupResourceServiceService', () => {
  let service: LdapGroupResourceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LdapGroupResourceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
