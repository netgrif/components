import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginFormComponent} from './login-form.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NullAuthenticationService} from '../../authentication/services/methods/null-authentication/null-authentication.service';
import {Credentials} from '../../authentication/models/credentials';
import {Observable, of} from 'rxjs';
import {User} from '../../authentication/models/user';
import {SignUpModule} from '../../authentication/sign-up/sign-up.module';

describe('LoginPanelComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                BrowserAnimationsModule,
                HttpClientTestingModule
            ],
            declarations: [LoginFormComponent],
            providers: [
                {provide: AuthenticationMethodService, useClass: MyAuth},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit', () => {
        component.rootFormGroup.controls['login'].setValue('login');
        component.rootFormGroup.controls['password'].setValue('pass');
        component.formSubmit.subscribe( event => {
            expect(event).toEqual({username: 'login', password: 'pass'});
        });
        component.onSubmit();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

class MyAuth extends AuthenticationMethodService {
    login(credentials: Credentials): Observable<User> {
        return of({email: 'mail', id: 'id', name: 'name', surname: 'surname'});
    }

    logout(): Observable<object> {
        return of(undefined);
    }
}

