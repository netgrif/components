import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {FormBuilder} from '@angular/forms';
import {AbstractLoginFormComponent} from './abstract-login-form.component';
import {UserService} from '../../user/services/user.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';

describe('AbstractLoginFormComponent', () => {
    let component: TestLoginFormComponent;
    let fixture: ComponentFixture<TestLoginFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([])
            ],
            declarations: [TestLoginFormComponent],
            providers: [
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestLoginFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit', (done) => {
        component.rootFormGroup.controls['login'].setValue('login');
        component.rootFormGroup.controls['password'].setValue('pass');
        component.formSubmit.subscribe( event => {
            expect(event).toEqual({username: 'login', password: 'pass'});
            done();
        });
        component.onSubmit();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-login',
    template: ''
})
class TestLoginFormComponent extends AbstractLoginFormComponent {
    constructor(formBuilder: FormBuilder, protected _userService: UserService) {
        super(formBuilder, _userService);
    }
}
