import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional} from '@angular/core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ConfigurationService} from '../../configuration/configuration.service';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {ErrorSnackBarComponent} from '../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {FileField} from './models/file-field';
import {AbstractFileFieldComponent} from './abstract-file-field.component';
import {TranslateService} from '@ngx-translate/core';
import {TaskResourceService} from '../../resources/engine-endpoint/task-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {DomSanitizer} from '@angular/platform-browser';
import {EventService} from '../../event/services/event.service';

describe('AbstractFileFieldComponent', () => {
    let component: TestFileComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
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
                {provide: ConfigurationService, useClass: TestConfigurationService}
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
    selector: 'nae-test-file',
    template: ''
})
class TestFileComponent extends AbstractFileFieldComponent {
    constructor(taskResourceService: TaskResourceService,
                log: LoggerService,
                snackbar: SnackBarService,
                translate: TranslateService,
                sanitizer: DomSanitizer,
                eventService: EventService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(taskResourceService, log, snackbar, translate, eventService, informAboutInvalidData, sanitizer);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-file [dataField]="field" taskId="666"></nae-test-file>'
})
class TestWrapperComponent {
    field = new FileField('', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    });
}
