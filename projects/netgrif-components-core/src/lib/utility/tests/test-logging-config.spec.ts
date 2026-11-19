import {TestLoggingConfigurationService} from './test-logging-config';
import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('TestLoggingConfigurationService', () => {
    let service: ConfigurationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                {provide: ConfigurationService, useClass: TestLoggingConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(ConfigurationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have logging enabled', () => {
        expect(service.getConfigurationSubtree(['services', 'log', 'level'])).toBe('ALL');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

});
