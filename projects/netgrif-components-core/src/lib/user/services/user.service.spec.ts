import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
            ]
        });
        service = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login', (done) => {
        service.login({password: '', username: ''}).subscribe(res => {
            expect(res.id).toEqual('id');
            expect(service.hasAuthority('ADMIN')).toBeTrue();
            expect(service.hasRoleById('id')).toBeTrue();
            done();
        });
    });

    it('should logout', (done) => {
        service.logout().subscribe(res => {
            expect(res).toEqual(undefined);
            done();
        });
    });

    it('should check authorities and roles', () => {
        expect(service.hasRole({stringId: 'ids', name: 'ids', importId: 'importId'})).toBeFalse();
        expect(service.hasAuthority('USER')).toBeFalse();
        expect(service.hasRoleById('ids')).toBeFalse();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
