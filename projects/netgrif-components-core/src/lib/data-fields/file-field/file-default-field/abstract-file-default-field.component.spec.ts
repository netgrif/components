import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MaterialModule} from "../../../material/material.module";
import {AngularResizeEventModule} from "angular-resize-event";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
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
import {DomSanitizer} from "@angular/platform-browser";
import {FileField} from "../models/file-field";
import {AbstractFileDefaultFieldComponent} from "./abstract-file-default-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/models/wrapped-boolean";

describe('AbstractFileDefaultFieldComponent', () => {
    let component: TestFileComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule,
                NoopAnimationsModule,
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
                        dataField: new FileField('', '', {
                            required: true,
                            optional: true,
                            visible: true,
                            editable: true,
                            hidden: true
                        }),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<FileField>
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                TestWrapperComponent,
                TestFileComponent
            ],
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
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
    selector: 'ncc-test-file',
    template: ''
})
class TestFileComponent extends AbstractFileDefaultFieldComponent {
    constructor(taskResourceService: TaskResourceService,
                log: LoggerService,
                snackbar: SnackBarService,
                translate: TranslateService,
                sanitizer: DomSanitizer,
                eventService: EventService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FileField>) {
        super(taskResourceService, log, snackbar, translate, eventService, sanitizer, dataFieldPortalData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-file></ncc-test-file>'
})
class TestWrapperComponent {

}
