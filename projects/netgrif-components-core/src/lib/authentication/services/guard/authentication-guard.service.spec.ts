import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {AuthenticationMethodService} from '../authentication-method.service';
import {AuthenticationGuardService} from './authentication-guard.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {RouterTestingModule} from '@angular/router/testing';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AuthenticationGuardService', () => {
    let service: AuthenticationGuardService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                AuthenticationGuardService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]});
        service = TestBed.inject(AuthenticationGuardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
