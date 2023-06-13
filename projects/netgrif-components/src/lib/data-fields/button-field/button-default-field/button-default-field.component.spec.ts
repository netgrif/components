import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDefaultFieldComponent } from './button-default-field.component';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ButtonField,
    ConfigurationService,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
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
import {ButtonFieldComponent} from "../button-field.component";
import {DataFieldTemplateComponent} from "../../data-field-template/data-field-template.component";
import {RequiredLabelComponent} from "../../required-label/required-label.component";
import {FormControl} from "@angular/forms";

describe('ButtonDefaultFieldComponent', () => {
  let component: ButtonDefaultFieldComponent;
  let fixture: ComponentFixture<ButtonDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
            {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                    dataField: new ButtonField('', '', {
                        required: true,
                    }),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean()
                } as DataFieldPortalData<ButtonField>
            }
        ],
        declarations: [
            ButtonFieldComponent,
            DataFieldTemplateComponent,
            RequiredLabelComponent,
            ButtonDefaultFieldComponent
        ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDefaultFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
