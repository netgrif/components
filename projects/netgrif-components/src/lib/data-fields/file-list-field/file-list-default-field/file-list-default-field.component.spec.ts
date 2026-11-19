import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListDefaultFieldComponent } from './file-list-default-field.component';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    FileListField,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    SideMenuService,
    SnackBarModule,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService,
    WrappedBoolean
} from "@netgrif/components-core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FileListFieldComponent} from "../file-list-field.component";
import {FormControl} from "@angular/forms";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FileListDefaultFieldComponent', () => {
  let component: FileListDefaultFieldComponent;
  let fixture: ComponentFixture<FileListDefaultFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [
            FileListFieldComponent,
            FileListDefaultFieldComponent
        ],
        imports: [
            MaterialModule,
            TranslateLibModule,
            SnackBarModule
        ],
        providers: [
            SideMenuService,
            {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
            {provide: AuthenticationService, useClass: MockAuthenticationService},
            {provide: UserResourceService, useClass: MockUserResourceService},
            {provide: ConfigurationService, useClass: TestConfigurationService},
            {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                    dataField: new FileListField('', '', {
                        required: true,
                        optional: true,
                        visible: true,
                        editable: true,
                        hidden: true
                    }),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean(),
                    additionalFieldProperties: {taskId: '0'}
                } as DataFieldPortalData<FileListField>
            },
            provideHttpClient(withXhr(), withInterceptorsFromDi()),
            provideHttpClientTesting()
        ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListDefaultFieldComponent);
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
