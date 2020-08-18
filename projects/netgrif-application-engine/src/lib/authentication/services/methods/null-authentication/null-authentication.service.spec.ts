import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationModule} from '../../../authentication.module';
import {NullAuthenticationService} from './null-authentication.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('NullAuthenticationService', () => {
    let service: NullAuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AuthenticationModule, HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                HttpClient,
                NullAuthenticationService
            ]});
        service = TestBed.inject(NullAuthenticationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
