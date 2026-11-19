import {TestBed} from '@angular/core/testing';
import {AuthenticationService} from './authentication.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {AuthenticationMethodService} from '../authentication-method.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule.withRoutes([])],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]});
        service = TestBed.inject(AuthenticationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should logout', (done) => {
        service.logout().subscribe(res => {
            expect(res).toEqual(undefined);
            done();
        });
    });

    it('should login', (done) => {
        service.login({username: '', password: ''}).subscribe( res => {
            expect(res.id).toEqual('id');
            expect(service.isAuthenticated).toBe(true);
            done();
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
