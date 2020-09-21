import { TestBed } from '@angular/core/testing';

import { UserInviteService } from './user-invite.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';

describe('UserInviteService', () => {
  let service: UserInviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            {provide: ConfigurationService, useClass: TestConfigurationService}
        ]
    });
    service = TestBed.inject(UserInviteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
