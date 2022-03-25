import {AbstractRegistrationComponent} from './abstract-registration.component';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {LoggerService} from '../../logger/services/logger.service';
import {UserRegistrationRequest} from '../../authentication/sign-up/models/user-registration-request';
import {Observable, of, throwError} from 'rxjs';
import {MessageResource} from '../../resources/interface/message-resource';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockSignUpService} from '../../utility/tests/mocks/mock-sign-up.service';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {NullAuthenticationService} from '../../authentication/services/methods/null-authentication/null-authentication.service';
import {TranslateService} from '@ngx-translate/core';

describe('AbstractRegistrationComponent', () => {
    let component: TestRegFormComponent;
    let fixture: ComponentFixture<TestRegFormComponent>;
    let mockSignupService: MockSignUpService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            declarations: [TestRegFormComponent],
            providers: [
                {provide: SignUpService, useClass: MockSignUpService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: NullAuthenticationService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRegFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        mockSignupService = TestBed.inject(SignUpService) as unknown as MockSignUpService;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fail to verify token NAE-1073', (done) => {
        mockSignupService.verifyResponse = throwError(new Error('err'));

        component.invalidToken.subscribe( () => {
            expect(component.loadingToken.isActive).toBeFalse();
            expect(component.tokenVerified).toBeFalse();
            done();
        });
        component.token = 'fakeToken';
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-reg',
    template: ''
})
class TestRegFormComponent extends AbstractRegistrationComponent {
    constructor(signupService: SignUpService, log: LoggerService, translate: TranslateService) {
        super(signupService, log, translate);
    }

    protected createRequestBody(): UserRegistrationRequest {
        return undefined;
    }

    protected callRegistration(requestBody: UserRegistrationRequest): Observable<MessageResource> {
        return of({});
    }
}
