import {TestBed} from '@angular/core/testing';
import {AuthenticationService} from './authentication.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {AuthenticationMethodService} from '../authentication-method.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
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
