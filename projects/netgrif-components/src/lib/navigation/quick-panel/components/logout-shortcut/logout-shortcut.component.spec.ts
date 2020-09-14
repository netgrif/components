import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LogoutShortcutComponent} from './logout-shortcut.component';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
    MaterialModule,
    TranslateLibModule,
    AuthenticationMethodService,
    ConfigurationService,
    UserService,
    TestConfigurationService,
    LoggerService,
    MockAuthenticationMethodService
} from '@netgrif/application-engine';

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
                HttpClientTestingModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

class MyUserService {
    logout() {
        return of(undefined);
    }
}
