import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserInviteComponent} from './user-invite.component';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    SignUpService,
    TestConfigurationService,
    TranslateLibModule
} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('UserInviteComponent', () => {
    let component: UserInviteComponent;
    let fixture: ComponentFixture<UserInviteComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [UserInviteComponent],
            imports: [ MaterialModule, TranslateLibModule],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SignUpService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserInviteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
