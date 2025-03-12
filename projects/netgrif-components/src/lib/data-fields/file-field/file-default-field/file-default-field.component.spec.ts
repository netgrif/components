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
import {AngularResizeEventModule} from "angular-resize-event";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormControl} from "@angular/forms";

describe('FileDefaultFieldComponent', () => {
  let component: FileDefaultFieldComponent;
  let fixture: ComponentFixture<FileDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            MaterialModule,
            AngularResizeEventModule,
            BrowserAnimationsModule,
            HttpClientTestingModule,
            TranslateLibModule,
            NoopAnimationsModule
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
                    }, undefined, undefined),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean(),
                    additionalFieldProperties: {taskId: '0'}
                } as DataFieldPortalData<FileField>
            }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [
            FileDefaultFieldComponent,
            ErrorSnackBarComponent,
            SuccessSnackBarComponent
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDefaultFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
