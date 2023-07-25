import { TestBed } from '@angular/core/testing';

import { FrontActionService } from './front-action.service';
import {ConfigurationService} from "../../configuration/configuration.service";
import {TestConfigurationService} from "../../utility/tests/test-config";

describe('FrontActionService', () => {
  let service: FrontActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            FrontActionService,
            {provide: ConfigurationService, useClass: TestConfigurationService}
        ]
    });
    service = TestBed.inject(FrontActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
