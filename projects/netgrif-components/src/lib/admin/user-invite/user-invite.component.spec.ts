import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserInviteComponent} from './user-invite.component';
import {
    MaterialModule,
    TranslateLibModule,
    ConfigurationService,
    TestConfigurationService,
    SignUpService,
    AuthenticationService,
    MockAuthenticationService,
    AuthenticationMethodService,
    MockAuthenticationMethodService
} from '@netgrif/application-engine';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('UserInviteComponent', () => {
    let component: UserInviteComponent;
    let fixture: ComponentFixture<UserInviteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule, TranslateLibModule, NoopAnimationsModule],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SignUpService
            ],
            declarations: [UserInviteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserInviteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
