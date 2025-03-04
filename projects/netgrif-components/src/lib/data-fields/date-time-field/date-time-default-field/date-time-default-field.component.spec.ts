import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeDefaultFieldComponent } from './date-time-default-field.component';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService, CustomDateAdapter,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DateTimeField,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService,
    WrappedBoolean
} from "@netgrif/components-core";
import {AngularResizeEventModule} from "angular-resize-event";
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DataFieldTemplateComponent} from "../../data-field-template/data-field-template.component";
import {RequiredLabelComponent} from "../../required-label/required-label.component";
import moment from "moment";
import {FormControl} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {NgxMatMomentModule} from "@angular-material-components/moment-adapter";

describe('DateTimeDefaultFieldComponent', () => {
  let component: DateTimeDefaultFieldComponent;
  let fixture: ComponentFixture<DateTimeDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [
            MaterialModule,
            AngularResizeEventModule,
            NgxMatDatetimePickerModule,
            TranslateLibModule,
            HttpClientTestingModule,
            NoopAnimationsModule,
            NgxMatNativeDateModule,
            NgxMatMomentModule
        ],
        providers: [
            {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            {provide: AuthenticationService, useClass: MockAuthenticationService},
            {provide: UserResourceService, useClass: MockUserResourceService},
            {provide: ConfigurationService, useClass: TestConfigurationService},
            {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                    dataField: new DateTimeField('', '', moment('2020-03-09'), {
                        required: true,
                        optional: true,
                        visible: true,
                        editable: true,
                        hidden: true
                    }, undefined, undefined, undefined, [
                        {name: 'between', message: 'This is custom message!', clientArguments: ['today', 'future']},
                        {name: 'between', message: 'This is custom message!', clientArguments: ['past', 'today']},
                        {name: 'between', message: 'This is custom message!', clientArguments: ['2020-03-03', 'today']},
                    ]),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean()
                } as DataFieldPortalData<DateTimeField>
            },
            {provide: DateAdapter, useClass: CustomDateAdapter}
        ],
        declarations: [
            DateTimeDefaultFieldComponent,
            DataFieldTemplateComponent,
            RequiredLabelComponent,
        ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeDefaultFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
