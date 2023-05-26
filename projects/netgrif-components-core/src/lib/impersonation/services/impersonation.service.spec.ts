import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ImpersonationService} from './impersonation.service';
import {UserService} from '../../user/services/user.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {FilterRepository} from '../../filter/filter.repository';
import {LoggerService} from '../../logger/services/logger.service';
import {TranslateService} from '@ngx-translate/core';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {User} from '../../user/models/user';
import {ProcessRole} from '../../resources/interface/process-role';
import {Observable, ReplaySubject} from 'rxjs';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {MockUserPreferenceService} from '../../utility/tests/mocks/mock-user-preference.service';

describe('ImpersonationService', () => {
    let service: ImpersonationService;
    let userService: TestUserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule, TranslateLibModule, NoopAnimationsModule, SnackBarModule, RouterTestingModule],
            providers: [
                SnackBarService,
                FilterRepository,
                LoggerService,
                TranslateService,
                ImpersonationService,
                {provide: UserPreferenceService, useClass: MockUserPreferenceService},
                {provide: UserService, useClass: TestUserService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(ImpersonationService);
        userService = (TestBed.inject(UserService) as any) as TestUserService;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should impersonate user', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    userService.mimicUserLoaded();
                    service.impersonating$.subscribe(bool => {
                        expect(bool).toBeTrue();
                        done();
                    })
                    service.impersonateUser('testId');

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/impersonate/user/testId');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({});
                })();
        }
    );

    it('should impersonate config', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    userService.mimicUserLoaded();
                    service.impersonating$.subscribe(bool => {
                        expect(bool).toBeTrue();
                        done();
                    })
                    service.impersonateByConfig('configId');

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/impersonate/config/configId');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({});
                })();
        }
    );

    it('should stop impersonating', (done) => {
            inject([HttpTestingController],
                (httpMock: HttpTestingController) => {
                    userService.reverse();
                    userService.mimicUserLoaded();

                    service.impersonating$.subscribe(bool => {
                        expect(bool).toBeFalse();
                        done();
                    })
                    service.cease();

                    const reqLog = httpMock.expectOne('http://localhost:8080/api/impersonate/clear');
                    expect(reqLog.request.method).toEqual('POST');

                    reqLog.flush({});
                })();
        }
    );

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
        TestBed.resetTestingModule();
    }));
});


class TestUserService {

    protected mockUser$ = new ReplaySubject<User>();

    public userObj = new User('id', 'mail', '', '', [], [{stringId: 'role'} as ProcessRole], [], []);
    public userObjAfter = new User(
        this.userObj.id, this.userObj.email, this.userObj.firstName, this.userObj.lastName, this.userObj.authorities, this.userObj.roles, this.userObj.groups, this.userObj.nextGroups,
        new User('impId', 'mail', '', '', [], [{stringId: 'role'} as ProcessRole], [], [])
    );

    public get user(): User {
        return this.userObj;
    }

    public get user$(): Observable<User> {
        return this.mockUser$.asObservable();
    }

    public get anonymousUser$(): Observable<User> {
        return this.mockUser$.asObservable();
    }

    public reload(): void {
        this.mockUser$.next( this.userObjAfter);
    }

    public mimicUserLoaded(): void {
        this.mockUser$.next(this.user);
    }

    public reverse(): void {
        const temp = this.userObjAfter;
        this.userObjAfter = this.userObj;
        this.userObj = temp;
    }
}
