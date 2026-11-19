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
    UserResourceService, WrappedBoolean
} from "@netgrif/components-core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {FormControl} from '@angular/forms';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('BooleanSimpleFieldComponent', () => {
  let component: BooleanDefaultFieldComponent;
  let fixture: ComponentFixture<BooleanDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [BooleanDefaultFieldComponent],
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
                    dataField: new BooleanField('', '', false, {
                            editable: true
                        }, undefined,
                        undefined,
                        undefined,
                        [{validationRule: 'requiredTrue', validationMessage: 'this is custom message'}]),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean()
                } as DataFieldPortalData<BooleanField>
            },
            provideHttpClient(withXhr(), withInterceptorsFromDi()),
            provideHttpClientTesting()
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanDefaultFieldComponent);
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
