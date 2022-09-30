import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularResizeEventModule} from 'angular-resize-event';
import {DataFieldTemplateComponent} from '../../data-field-template/data-field-template.component';
import {RequiredLabelComponent} from '../../required-label/required-label.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import moment from 'moment';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {BehaviorSubject} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ChangedFields,
    ConfigurationService,
    DateTimeField,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService
} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SimpleDateTimeFieldComponent } from './simple-date-time-field.component';

describe('SimpleDatetimeFieldComponent', () => {
    let component: SimpleDateTimeFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                NgxMatDatetimePickerModule,
                TranslateLibModule, HttpClientTestingModule, NoopAnimationsModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                SimpleDateTimeFieldComponent,
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-simple-date-time-field [dataField]="field" [changedFields]="changedFields"></nc-simple-date-time-field>'
})
class TestWrapperComponent {
    field = new DateTimeField('', '', moment('2020-03-09'), {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, []);
    changedFields = new BehaviorSubject<ChangedFields>({behavior: {editable: true}});
}

