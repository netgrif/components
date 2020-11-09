import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {FormBuilder} from '@angular/forms';
import {AbstractRegistrationFormComponent} from './abstract-registration-form.component';
import {LoggerService} from '../../logger/services/logger.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {NullAuthenticationService} from '../../authentication/services/methods/null-authentication/null-authentication.service';
import {MockSignUpService} from '../../utility/tests/mocks/mock-sign-up.service';
import {throwError} from 'rxjs';

describe('AbstractRegistrationPanelComponent', () => {
    let component: TestRegFormComponent;
    let fixture: ComponentFixture<TestRegFormComponent>;
    let mockSignupService: MockSignUpService;

    beforeEach(async(() => {
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

    it('should submit', () => {
        component.rootFormGroup.controls['email'].setValue('mail@mail.sk');
        component.rootFormGroup.controls['name'].setValue('name');
        component.rootFormGroup.controls['surname'].setValue('surname');
        component.rootFormGroup.controls['password'].setValue('passwd');
        component.rootFormGroup.controls['confirmPassword'].setValue('passwd');
        component.formSubmit.subscribe( event => {
            expect(event).toEqual({
                token: undefined,
                email: 'mail@mail.sk',
                name: 'name',
                surname: 'surname',
                password: 'passwd'
            });
        });
        component.register.subscribe(event => {
            expect(event).toEqual({error: 'Provided token undefined is not valid'});
        });
        component.onSubmit();
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
    selector: 'nae-test-reg',
    template: ''
})
class TestRegFormComponent extends AbstractRegistrationFormComponent {
    constructor(formBuilder: FormBuilder, protected _signupService: SignUpService, protected _log: LoggerService) {
        super(formBuilder, _signupService, _log);
    }
}
