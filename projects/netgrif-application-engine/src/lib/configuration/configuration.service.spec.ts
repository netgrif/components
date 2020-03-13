import {TestBed} from '@angular/core/testing';

import {ConfigurationService} from './configuration.service';

describe('ConfigurationService', () => {
    let service: ConfigurationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(ConfigurationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

class TestConfigurationService extends ConfigurationService {
    constructor() {
        super(null);
    }
}
