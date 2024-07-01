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
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {ErrorSnackBarComponent} from "../../../snack-bar/components/error-snack-bar/error-snack-bar.component";
import {SuccessSnackBarComponent} from "../../../snack-bar/components/success-snack-bar/success-snack-bar.component";
import {TaskResourceService} from "../../../resources/engine-endpoint/task-resource.service";
import {LoggerService} from "../../../logger/services/logger.service";
import {SnackBarService} from "../../../snack-bar/services/snack-bar.service";
import {TranslateService} from "@ngx-translate/core";
import {FileListField} from "../models/file-list-field";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractFileListDefaultFieldComponent} from "./abstract-file-list-default-field.component";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/models/wrapped-boolean";

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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-filelist',
    template: ''
})
class TestFileListComponent extends AbstractFileListDefaultFieldComponent {
    constructor(taskResourceService: TaskResourceService,
                log: LoggerService,
                snackbar: SnackBarService,
                translate: TranslateService,
                eventService: EventService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FileListField>) {
        super(taskResourceService, log, snackbar, translate, eventService, dataFieldPortalData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-filelist></ncc-test-filelist>'
})
class TestWrapperComponent {
}
