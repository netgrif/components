import { TestBed } from '@angular/core/testing';

import { RedirectService } from './redirect.service';
import {RouterModule} from '@angular/router';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('RedirectService', () => {
  let service: RedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [RouterModule.forRoot([])],
        providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
    });
    service = TestBed.inject(RedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
