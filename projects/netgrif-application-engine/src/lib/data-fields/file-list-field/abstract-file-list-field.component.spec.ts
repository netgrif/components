import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MaterialModule} from '../../material/material.module';
import {FileFieldService} from '../file-field/services/file-field.service';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {AbstractFileListFieldComponent} from './abstract-file-list-field.component';
import {FileListField} from './models/file-list-field';
import {TranslateService} from '@ngx-translate/core';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';

describe('AbstractFileListFieldComponent', () => {
    let component: TestFilelistComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule,
                SnackBarModule
            ],
            providers: [
                FileFieldService,
                SideMenuService,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                TestWrapperComponent,
                TestFilelistComponent
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
    selector: 'nae-test-filelist',
    template: ''
})
class TestFilelistComponent extends AbstractFileListFieldComponent {
    constructor(protected _taskResourceService: TaskResourceService,
                protected _log: LoggerService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService) {
        super(_taskResourceService, _log, _snackbar, _translate);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-filelist [dataField]="field" taskId="666"></nae-test-filelist>'
})
class TestWrapperComponent {
    field = new FileListField('', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}
