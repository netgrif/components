import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizeEventModule} from 'angular-resize-event';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional} from '@angular/core';
import moment from 'moment';
import {ConfigurationService} from '../../configuration/configuration.service';
import {AbstractDateFieldComponent} from './abstract-date-field.component';
import {DateField} from './models/date-field';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MaterialModule} from '../../material/material.module';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {DateAdapter} from '@angular/material/core';
import {CustomDateAdapter} from './models/custom-date-adapter';

describe('AbstractDateFieldComponent', () => {
    let component: TestDateFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                TranslateLibModule,
                HttpClientTestingModule, NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: DateAdapter, useClass: CustomDateAdapter}
            ],
            declarations: [
                TestDateFieldComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-date',
    template: ''
})
class TestDateFieldComponent extends AbstractDateFieldComponent {
    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-date [dataField]="field"></ncc-test-date>'
})
class TestWrapperComponent {
    field = new DateField('', '', moment(new Date()), {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, [
        {name: 'weekend', message: 'This is custom message!'},
        {name: 'workday', message: 'This is custom message!'}
    ]);
}
