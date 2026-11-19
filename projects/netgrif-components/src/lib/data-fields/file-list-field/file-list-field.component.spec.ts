import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {FileListFieldComponent} from './file-list-field.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    ErrorSnackBarComponent,
    FileListField,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    SideMenuService,
    SnackBarModule,
    SuccessSnackBarComponent,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService
} from '@netgrif/components-core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FileListFieldComponent', () => {
    let component: FileListFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [FileListFieldComponent, TestWrapperComponent],
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
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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
    selector: 'nc-test-wrapper',
    template: '<nc-file-list-field [dataField]="field" taskId="666"></nc-file-list-field>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
