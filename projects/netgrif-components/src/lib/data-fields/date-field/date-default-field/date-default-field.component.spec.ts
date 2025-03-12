import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateDefaultFieldComponent } from './date-default-field.component';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService, CustomDateAdapter,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DateField,
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
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DateFieldComponent} from "../date-field.component";
import {DataFieldTemplateComponent} from "../../data-field-template/data-field-template.component";
import {RequiredLabelComponent} from "../../required-label/required-label.component";
import moment from "moment";
import {FormControl} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {NgxMatMomentModule} from "@angular-material-components/moment-adapter";

describe('DateDefaultFieldComponent', () => {
  let component: DateDefaultFieldComponent;
  let fixture: ComponentFixture<DateDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            MaterialModule,
            AngularResizeEventModule,
            TranslateLibModule,
            HttpClientTestingModule,
            NoopAnimationsModule,
            NgxMatMomentModule,
        ],
        providers: [
            {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            {provide: AuthenticationService, useClass: MockAuthenticationService},
            {provide: UserResourceService, useClass: MockUserResourceService},
            {provide: ConfigurationService, useClass: TestConfigurationService},
            {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                    dataField: new DateField('', '', moment(new Date()), {
                        required: true,
                        optional: true,
                        visible: true,
                        editable: true,
                        hidden: true
                    }, undefined, undefined, undefined, [
                        {name: 'weekend', message: 'This is custom message!'},
                        {name: 'workday', message: 'This is custom message!'}
                    ]),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean()
                } as DataFieldPortalData<DateField>
            },
            {provide: DateAdapter, useClass: CustomDateAdapter}
        ],
        declarations: [
            DateFieldComponent,
            DataFieldTemplateComponent,
            RequiredLabelComponent,
            DateDefaultFieldComponent
        ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateDefaultFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
