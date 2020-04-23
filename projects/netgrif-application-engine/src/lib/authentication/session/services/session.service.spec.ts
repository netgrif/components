import {TestBed} from '@angular/core/testing';

import {SessionService} from './session.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';

describe('SessionService', () => {
    let service: SessionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(SessionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

