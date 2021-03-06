import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NullAuthenticationService} from './null-authentication.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('NullAuthenticationService', () => {
    let service: NullAuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                NullAuthenticationService
            ]});
        service = TestBed.inject(NullAuthenticationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
