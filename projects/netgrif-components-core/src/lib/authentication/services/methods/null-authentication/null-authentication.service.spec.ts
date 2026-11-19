import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {NullAuthenticationService} from './null-authentication.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('NullAuthenticationService', () => {
    let service: NullAuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                NullAuthenticationService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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
