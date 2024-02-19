import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooleanDefaultFieldComponent } from './boolean-default-field.component';
import {
    AuthenticationMethodService,
    AuthenticationService,
    BooleanField,
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
    WrappedBoolean,
    Validator,
    requiredTrueValidation
} from "@netgrif/components-core";
import {AngularResizeEventModule} from "angular-resize-event";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormControl} from "@angular/forms";

describe('BooleanSimpleFieldComponent', () => {
  let component: BooleanDefaultFieldComponent;
  let fixture: ComponentFixture<BooleanDefaultFieldComponent>;

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
                    dataField: new BooleanField('', '', false, {
                            editable: true
                        }, undefined,
                        undefined,
                        undefined,
                        [{name: 'requiredTrue', validationMessage: 'this is custom message'}],
                        undefined,
                        undefined,
                        new Map<string, Validator>([['requiredTrue', requiredTrueValidation]])),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean()
                } as DataFieldPortalData<BooleanField>
            }
        ],
      declarations: [ BooleanDefaultFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanDefaultFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
