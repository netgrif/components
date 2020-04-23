import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LogoutShortcutComponent} from './logout-shortcut.component';
import {MaterialModule} from '../../../../material/material.module';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {LoggerService} from '../../../../logger/services/logger.service';
import {UserService} from '../../../../user/services/user.service';
import {of} from 'rxjs';

describe('LogoutShortcutComponent', () => {
    let component: LogoutShortcutComponent;
    let fixture: ComponentFixture<LogoutShortcutComponent>;
    let logSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LogoutShortcutComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                HttpClientTestingModule
            ],
            providers: [
                AuthenticationMethodService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: UserService, useClass: MyUserService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoutShortcutComponent);
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
});

class MyUserService {
    logout() {
        return of(undefined);
    }
}
