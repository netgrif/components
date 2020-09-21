import { TestBed } from '@angular/core/testing';

import { OrganizationListService } from './organization-list.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';

describe('OrgListService', () => {
  let service: OrganizationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
    });
    service = TestBed.inject(OrganizationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
