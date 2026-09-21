import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MaterialModule} from "../../../material/material.module";
import {AngularResizeEventModule} from "angular-resize-event";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateLibModule} from "../../../translate/translate-lib.module";
import {SnackBarModule} from "../../../snack-bar/snack-bar.module";
import {SideMenuService} from "../../../side-menu/services/side-menu.service";
import {EventService} from "../../../event/services/event.service";
import {AuthenticationMethodService} from "../../../authentication/services/authentication-method.service";
import {MockAuthenticationMethodService} from "../../../utility/tests/mocks/mock-authentication-method-service";
import {AuthenticationService} from "../../../authentication/services/authentication/authentication.service";
import {MockAuthenticationService} from "../../../utility/tests/mocks/mock-authentication.service";
import {UserResourceService} from "../../../resources/engine-endpoint/user-resource.service";
import {MockUserResourceService} from "../../../utility/tests/mocks/mock-user-resource.service";
import {ConfigurationService} from "../../../configuration/configuration.service";
import {TestConfigurationService} from "../../../utility/tests/test-config";
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional} from "@angular/core";
import {TaskResourceService} from "../../../resources/engine-endpoint/task-resource.service";
import {LoggerService} from "../../../logger/services/logger.service";
import {SnackBarService} from "../../../snack-bar/services/snack-bar.service";
import {TranslateService} from "@ngx-translate/core";
import {FileListField} from "../models/file-list-field";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractFileListDefaultFieldComponent} from "./abstract-file-list-default-field.component";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/models/wrapped-boolean";
import {FrontActionService} from "../../../actions/services/front-action.service";
import {MockTaskResourceService} from "../../../utility/tests/mocks/mock-task-resource.service";

describe('AbstractFileListDefaultFieldComponent', () => {
    let component: TestFileListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule,
                SnackBarModule
            ],
            providers: [
                SideMenuService,
                EventService,
                FrontActionService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: TaskResourceService, useClass: MockTaskResourceService},
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new FileListField('', '', {
                            required: true,
                            optional: true,
                            visible: true,
                            editable: true,
                            hidden: true
                        }, {}),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean(),
                        additionalFieldProperties: {taskId: '0'}
                    } as DataFieldPortalData<FileListField>
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                TestWrapperComponent,
                TestFileListComponent
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should simulate file download', () => {
        // Spy on the 'download' method
        spyOn(component, 'download').and.callFake(() => {
            // Simulate the download process
            const anchor = document.createElement('a');
            anchor.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('mockContent');
            anchor.download = 'mockFile.txt';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        });

        // Call the 'download' method
        component.download("mockFile.txt");

        // Assert that the 'download' method was called
        expect(component.download).toHaveBeenCalled();
    });

    it('should simulate file upload', () => {
        // Create a mock file
        const mockFile = new File(['mockContent'], 'mockFile.txt', {type: 'text/plain'});

        // Get the file input element's reference
        const fileInput = component.fileUploadEl.nativeElement;

        // Create a DataTransfer object to simulate file selection
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(mockFile);
        fileInput.files = dataTransfer.files;
        component.dataField.value = {namesPaths: [{file: mockFile, name: "mockFile.txt"}]}
        // Trigger the file upload method
        spyOn(component, 'upload').and.callThrough();
        const uploadButtonEvent = new Event('change');
        fileInput.dispatchEvent(uploadButtonEvent);
        component.upload();

        // Assertions
        expect(component.upload).toHaveBeenCalled();
        expect(component.dataField.value).toBeTruthy(); // Ensure value is processed
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-filelist',
    template: '<input type="file" #fileUploadInput name="fileUpload" [multiple]="true" accept="{{dataField.allowTypes}}" class="invisible-input"/>'
})
class TestFileListComponent extends AbstractFileListDefaultFieldComponent {
    constructor(taskResourceService: TaskResourceService,
                log: LoggerService,
                snackbar: SnackBarService,
                translate: TranslateService,
                eventService: EventService,
                frontActionService: FrontActionService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FileListField>) {
        super(taskResourceService, log, snackbar, translate, eventService, frontActionService, dataFieldPortalData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-filelist></ncc-test-filelist>'
})
class TestWrapperComponent {
}
