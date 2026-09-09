import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ActivatedRouteSnapshot, convertToParamMap, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {AuthenticationMethodService} from '../authentication-method.service';
import {AuthenticationGuardService} from './authentication-guard.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {RouterTestingModule} from '@angular/router/testing';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SessionService} from '../../session/services/session.service';
import {Observable, firstValueFrom, of} from 'rxjs';
import {UserService} from '../../../user/services/user.service';
import {User} from '../../../user/models/user';

describe('AuthenticationGuardService', () => {
    let service: AuthenticationGuardService;
    let session: SessionService;
    let userService: UserService;

    beforeEach(fakeAsync(() => {
        localStorage.removeItem(SessionService.SESSION_TOKEN_STORAGE_KEY);
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                AuthenticationGuardService
            ]});
        service = TestBed.inject(AuthenticationGuardService);
        session = TestBed.inject(SessionService);
        userService = TestBed.inject(UserService);
        tick();
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('logs in from an allowed API-token URL and removes credentials from the URL', async () => {
        const loginSpy = spyOn(userService, 'loginWithApiToken').and.callFake(() => {
            session.setVerifiedToken('session-token');
            return of(user());
        });

        const result = service.canActivate(
            routeWithQuery({token: 'user-id.secret', realmId: 'Admin', caseId: 'case-1'}),
            {url: '/tabbed-views?token=user-id.secret&realmId=Admin&caseId=case-1'} as RouterStateSnapshot
        ) as Observable<boolean | UrlTree>;
        const decision = await firstValueFrom(result);

        expect(loginSpy).toHaveBeenCalledWith('user-id.secret', 'Admin');
        expect(decision instanceof UrlTree).toBeTrue();
        expect(TestBed.inject(Router).serializeUrl(decision as UrlTree)).toBe('/tabbed-views?caseId=case-1');
    });

    it('does not consume an API token on a path outside the allow-list', () => {
        const loginSpy = spyOn(userService, 'loginWithApiToken');
        const login = service.canActivate(
            routeWithQuery({token: 'user-id.secret', realmId: 'Admin'}),
            {url: '/login?token=user-id.secret&realmId=Admin'} as RouterStateSnapshot
        ) as UrlTree;

        expect(loginSpy).not.toHaveBeenCalled();
        expect(TestBed.inject(Router).serializeUrl(login)).toBe('/login');
    });

    it('keeps token query parameters when API-token login is disabled for an existing session', () => {
        const configuration = TestBed.inject(ConfigurationService);
        const value = configuration.get();
        value.providers.auth.apiToken = {...value.providers.auth.apiToken, enabled: false};
        spyOn(configuration, 'get').and.returnValue(value);
        session.setVerifiedToken('session-token');

        const result = service.canActivate(
            routeWithQuery({token: 'application-value', realmId: 'application-realm'}),
            {url: '/tabbed-views?token=application-value&realmId=application-realm'} as RouterStateSnapshot
        );

        expect(result).toBeTrue();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        localStorage.removeItem(SessionService.SESSION_TOKEN_STORAGE_KEY);
    });
});

function routeWithQuery(query: Record<string, string>): ActivatedRouteSnapshot {
    return {queryParamMap: convertToParamMap(query)} as ActivatedRouteSnapshot;
}

function user(): User {
    return new User('id', 'username', 'mail', 'Admin', 'name', 'surname', [], [], [], []);
}
