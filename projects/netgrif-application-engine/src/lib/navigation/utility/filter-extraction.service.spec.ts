import {TestBed} from '@angular/core/testing';
import {FilterExtractionService} from './filter-extraction.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FilterExtractionService', () => {
    let service: FilterExtractionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(FilterExtractionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // TODO do a proper test with mocked backend case structure
});
