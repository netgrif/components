import { TestBed } from '@angular/core/testing';

import {PublicProcessService} from './public-process.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';
import {PetriNetResourceService} from '../resources/engine-endpoint/petri-net-resource.service';
import {AuthenticationMethodService} from '../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../utility/tests/mocks/mock-authentication-method-service';
import {ProcessService} from './process.service';
import {LoggerService} from '../logger/services/logger.service';

describe('PublicProcessService', () => {
  let service: PublicProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, NoopAnimationsModule],
        providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
    });
    service = TestBed.inject(PublicProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
