import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DateTimeFieldComponent} from './date-time-field.component';
import {MaterialModule} from '../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {DataFieldTemplateComponent} from '../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../required-label/required-label.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DateTimeField} from './models/date-time-field';
import moment from 'moment';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {BehaviorSubject} from 'rxjs';
import {ChangedFields} from '../models/changed-fields';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DatetimeFieldComponent', () => {
    let component: DateTimeFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                NgxMatDatetimePickerModule,
                TranslateLibModule, HttpClientTestingModule, NoopAnimationsModule
            ],
            providers: [
                AuthenticationMethodService,
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                DateTimeFieldComponent,
                DataFieldTemplateComponent,
                RequiredLabelComponent,
                TestWrapperComponent,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get error message', () => {
        expect(component.getErrorMessage()).toEqual('This is custom message!');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-date-time-field [dataField]="field" [changedFields]="changedFields"></nae-date-time-field>'
})
class TestWrapperComponent {
    field = new DateTimeField('', '', moment('2020-03-09'), {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, [
        {validationRule: 'between today,future', validationMessage: 'This is custom message!'},
        {validationRule: 'between past,today', validationMessage: 'This is custom message!'},
        {validationRule: 'between 2020-03-03,today', validationMessage: 'This is custom message!'},
        ]);
    changedFields = new BehaviorSubject<ChangedFields>({behavior: {editable: true}});
}

