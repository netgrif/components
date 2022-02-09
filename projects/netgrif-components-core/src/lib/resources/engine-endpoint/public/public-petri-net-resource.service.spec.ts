import { TestBed } from '@angular/core/testing';

import { PublicPetriNetResourceService } from './public-petri-net-resource.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';

describe('PublicPetriNetResourceService', () => {
  let service: PublicPetriNetResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, NoopAnimationsModule],
        providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]});
    service = TestBed.inject(PublicPetriNetResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
