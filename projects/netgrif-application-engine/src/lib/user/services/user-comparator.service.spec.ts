import { TestBed } from '@angular/core/testing';

import { UserComparatorService } from './user-comparator.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {NullAuthenticationService} from '../../authentication/services/methods/null-authentication/null-authentication.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('UserComparatorService', () => {
  let service: UserComparatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [{provide: AuthenticationMethodService, useClass: NullAuthenticationService},
            {provide: ConfigurationService, useClass: TestConfigurationService}]
    });
    service = TestBed.inject(UserComparatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
