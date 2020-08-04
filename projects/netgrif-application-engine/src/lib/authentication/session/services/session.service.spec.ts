import {TestBed} from '@angular/core/testing';

import {SessionService} from './session.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SessionService', () => {
    let service: SessionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(SessionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

