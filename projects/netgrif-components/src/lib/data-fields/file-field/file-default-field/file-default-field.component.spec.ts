import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDefaultFieldComponent } from './file-default-field.component';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    DATA_FIELD_PORTAL_DATA, DataFieldPortalData,
    ErrorSnackBarComponent, FileField,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    SideMenuService,
    SuccessSnackBarComponent,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService, WrappedBoolean
} from "@netgrif/components-core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormControl} from "@angular/forms";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FileDefaultFieldComponent', () => {
  let component: FileDefaultFieldComponent;
  let fixture: ComponentFixture<FileDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [
            FileDefaultFieldComponent,
            ErrorSnackBarComponent,
            SuccessSnackBarComponent
        ],
        imports: [
            MaterialModule,
            TranslateLibModule
        ],
        providers: [
            SideMenuService,
            {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            {provide: AuthenticationService, useClass: MockAuthenticationService},
            {provide: UserResourceService, useClass: MockUserResourceService},
            {provide: ConfigurationService, useClass: TestConfigurationService},
            {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                    dataField: new FileField('', '', {
                        required: true,
                        optional: true,
                        visible: true,
                        editable: true,
                        hidden: true
                    }),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean(),
                    additionalFieldProperties: {taskId: '0'}
                } as DataFieldPortalData<FileField>
            },
            provideHttpClient(withXhr(), withInterceptorsFromDi()),
            provideHttpClientTesting()
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDefaultFieldComponent);
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
