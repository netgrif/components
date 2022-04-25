import {TestLoggingConfigurationService} from './test-logging-config';
import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TestLoggingConfigurationService', () => {
    let service: ConfigurationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                {provide: ConfigurationService, useClass: TestLoggingConfigurationService}
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
