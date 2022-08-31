import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {Component} from '@angular/core';
import {AbstractLogoutShortcutComponent} from './abstract-logout-shortcut.component';
import {Router} from '@angular/router';
import {UserService} from '../../../../user/services/user.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {MockAuthenticationMethodService} from '../../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../../utility/tests/mocks/mock-authentication.service';

describe('AbstractLogoutShortcutComponent', () => {
    let component: TestLogoutComponent;
    let fixture: ComponentFixture<TestLogoutComponent>;
    let logSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestLogoutComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                HttpClientTestingModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: UserService, useClass: MyUserService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestLogoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        logSpy = spyOn(TestBed.inject(LoggerService), 'debug');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should logout', () => {
        component.logout();
        expect(logSpy).toHaveBeenCalledWith('User is logged out');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-logout',
    template: ''
})
class TestLogoutComponent extends AbstractLogoutShortcutComponent {
    constructor(protected _user: UserService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _router: Router) {
        super(_user, _log, _config, _router);
    }
}

class MyUserService {
    logout() {
        return of(undefined);
    }
}
