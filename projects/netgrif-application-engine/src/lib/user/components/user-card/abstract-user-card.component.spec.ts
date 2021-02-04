import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {UserPreferenceService} from '../../services/user-preference.service';
import {MockUserPreferenceService} from '../../../utility/tests/mocks/mock-user-preference.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {Component, Injector} from '@angular/core';
import {AbstractUserCardComponent} from './abstract-user-card.component';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';

describe('AbstractUserCardComponent', () => {
    let component: TestUserComponent;
    let fixture: ComponentFixture<TestUserComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestUserComponent],
            imports: [
                CommonModule,
                RouterModule,
                MaterialModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
                TranslateLibModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: UserPreferenceService, useValue: MockUserPreferenceService}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return user banner', () => {
        expect(component.userBanner).toEqual('assets/default-user-background.jpg');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-user',
    template: ''
})
class TestUserComponent extends AbstractUserCardComponent {
    constructor(protected _injector: Injector) {
        super(_injector);
    }
}
