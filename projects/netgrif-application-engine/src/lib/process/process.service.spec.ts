import {TestBed} from '@angular/core/testing';

import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ProcessService} from './process.service';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';

describe('ProcessService', () => {
    let service: ProcessService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpClient,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(ProcessService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
});
