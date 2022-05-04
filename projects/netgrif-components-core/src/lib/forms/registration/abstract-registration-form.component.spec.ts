import {waitForAsync, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
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
import {TranslateService} from '@ngx-translate/core';

describe('AbstractRegistrationPanelComponent', () => {
    let component: TestRegFormComponent;
    let fixture: ComponentFixture<TestRegFormComponent>;
    let mockSignupService: MockSignUpService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                NoopAnimationsModule,
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

    it('should submit', (done) => {
        component.rootFormGroup.controls['name'].setValue('name');
        component.rootFormGroup.controls['surname'].setValue('surname');
        component.rootFormGroup.controls['password'].setValue('password');
        component.rootFormGroup.controls['confirmPassword'].setValue('password');
        expect(component.rootFormGroup.valid).toBeTrue();
        component.formSubmit.subscribe( event => {
            expect(event).toEqual({
                token: undefined,
                name: 'name',
                surname: 'surname',
                password: 'password'
            });
        });
        component.register.subscribe(event => {
            expect(event).toEqual({error: 'Provided token undefined is not valid'});
            done();
        });
        component.onSubmit();
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
    constructor(formBuilder: FormBuilder, signupService: SignUpService, log: LoggerService, translate: TranslateService) {
        super(formBuilder, signupService, log, translate);
    }
}
