import {TestBed} from '@angular/core/testing';
import {FilterExtractionService} from './filter-extraction.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FilterExtractionService', () => {
    let service: FilterExtractionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(FilterExtractionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
    // TODO do a proper test with mocked backend case structure
});
