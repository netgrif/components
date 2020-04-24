import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {AuthenticationMethodService} from '../authentication-method.service';
import {AuthenticationGuardService} from './authentication-guard.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {AuthenticationModule} from '../../authentication.module';
import {RouterTestingModule} from '@angular/router/testing';
import {TestConfigurationService} from '../../../utility/tests/test-config';

describe('AuthenticationGuardService', () => {
    let service: AuthenticationGuardService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AuthenticationModule, RouterTestingModule],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                AuthenticationMethodService,
                AuthenticationService,
                AuthenticationGuardService
            ]});
        service = TestBed.inject(AuthenticationGuardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should resolve login path', () => {
        const test = new TestConfigurationService();
        expect(service.resolveLoginPath(test.get().views.routes, AuthenticationGuardService.LOGIN_COMPONENT)).toBe(null);
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
