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
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {DataFieldTemplateComponent} from "../../data-field-template/data-field-template.component";
import {RequiredLabelComponent} from "../../required-label/required-label.component";
import moment from "moment";
import {FormControl} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('DateTimeDefaultFieldComponent', () => {
  let component: DateTimeDefaultFieldComponent;
  let fixture: ComponentFixture<DateTimeDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [
            DateTimeDefaultFieldComponent,
            DataFieldTemplateComponent,
            RequiredLabelComponent
        ],
        imports: [
            MaterialModule,
            TranslateLibModule
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
                        {validationRule: 'between today,future', validationMessage: 'This is custom message!'},
                        {validationRule: 'between past,today', validationMessage: 'This is custom message!'},
                        {validationRule: 'between 2020-03-03,today', validationMessage: 'This is custom message!'},
                    ]),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean()
                } as DataFieldPortalData<DateTimeField>
            },
            {provide: DateAdapter, useClass: CustomDateAdapter},
            provideHttpClient(withXhr(), withInterceptorsFromDi()),
            provideHttpClientTesting()
        ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeDefaultFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
