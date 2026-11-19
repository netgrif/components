import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {LogoutShortcutComponent} from './logout-shortcut.component';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {
    AuthenticationMethodService,
    ConfigurationService,
    LoggerService,
    MaterialModule,
    MockAuthenticationMethodService,
    TestConfigurationService,
    TranslateLibModule,
    UserService
} from '@netgrif/components-core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('LogoutShortcutComponent', () => {
    let component: LogoutShortcutComponent;
    let fixture: ComponentFixture<LogoutShortcutComponent>;
    let logSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LogoutShortcutComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: UserService, useClass: MyUserService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

class MyUserService {
    logout() {
        return of(undefined);
    }
}
