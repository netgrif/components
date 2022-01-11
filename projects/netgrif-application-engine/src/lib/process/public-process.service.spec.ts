import { TestBed } from '@angular/core/testing';

import {PublicProcessService} from './public-process.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';

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
