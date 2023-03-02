import {AbstractChangePasswordComponent} from './abstract-change-password.component';
import {waitForAsync, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {
    NullAuthenticationService
} from '../../authentication/services/methods/null-authentication/null-authentication.service';
import {Component, Inject, NO_ERRORS_SCHEMA, Optional} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoggerService} from '../../logger/services/logger.service';
import {TranslateService} from '@ngx-translate/core';
import {ProfileService} from "../../authentication/profile/services/profile.service";
import {UserService} from "../../user/services/user.service";
import {encodeBase64} from "../../utility/base64";
import {MockProfileService} from "../../utility/tests/mocks/mock-profile.service";
import {NAE_MIN_PASSWORD_LENGTH} from "../min-password-length-token";

describe('AbstractChangePasswordComponent', () => {
    let component: TestRegFormComponent;
    let fixture: ComponentFixture<TestRegFormComponent>;
    let mockProfileService: MockProfileService;

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
                {provide: ProfileService, useClass: MockProfileService},
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
        mockProfileService = TestBed.inject(ProfileService) as unknown as MockProfileService;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit', (done) => {
        component.rootFormGroup.controls['oldPassword'].setValue('oldPassword');
        component.rootFormGroup.controls['password'].setValue('Password123');
        component.rootFormGroup.controls['confirmPassword'].setValue('Password123');
        expect(component.rootFormGroup.valid).toBeTrue();
        component.formSubmit.subscribe(event => {
            expect(event).toEqual({
                login: "",
                password: encodeBase64("oldPassword"),
                newPassword: encodeBase64("Password123")
            });
        });
        component.changePassword.subscribe(event => {
            expect(event).toEqual({success: 'success'});
            done();
        });
        component.onSubmit();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-reg',
    template: ''
})
class TestRegFormComponent extends AbstractChangePasswordComponent {
    constructor(formBuilder: FormBuilder, profileService: ProfileService, user: UserService, log: LoggerService, translate: TranslateService, @Optional() @Inject(NAE_MIN_PASSWORD_LENGTH)  minPasswordLength) {
        super(formBuilder, profileService, user, log, translate, minPasswordLength);
    }
}
