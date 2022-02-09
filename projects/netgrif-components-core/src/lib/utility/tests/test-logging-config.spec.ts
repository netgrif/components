import {TestLoggingConfigurationService} from './test-logging-config';
import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../configuration/configuration.service';

describe('TestLoggingConfigurationService', () => {
    let service: ConfigurationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
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
