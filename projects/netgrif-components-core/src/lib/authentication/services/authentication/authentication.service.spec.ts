import {TestBed} from '@angular/core/testing';
import {AuthenticationService} from './authentication.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {AuthenticationMethodService} from '../authentication-method.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {throwError} from 'rxjs';
import {TabSessionPersistenceService} from '../../../tabs/services/tab-session-persistence.service';

describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let authenticationMethod: AuthenticationMethodService;
    let tabPersistence: TabSessionPersistenceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            ]});
        service = TestBed.inject(AuthenticationService);
        authenticationMethod = TestBed.inject(AuthenticationMethodService);
        tabPersistence = TestBed.inject(TabSessionPersistenceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should logout', () => {
        const clear = spyOn(tabPersistence, 'clear');
        let result: object;

        service.logout().subscribe(res => {
            result = res;
        });

        expect(result).toEqual(undefined);
        expect(clear).toHaveBeenCalled();
    });

    it('should clear persisted tabs when logout fails', () => {
        spyOn(console, 'error');
        spyOn(authenticationMethod, 'logout').and.returnValue(throwError(() => new Error('Logout failed')));
        const clear = spyOn(tabPersistence, 'clear');

        service.logout().subscribe();

        expect(clear).toHaveBeenCalled();
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
