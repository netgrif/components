import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {FileFieldComponent} from './file-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    ErrorSnackBarComponent,
    FileField,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    SideMenuService,
    SuccessSnackBarComponent,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService
} from '@netgrif/components-core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('FileFieldComponent', () => {
    let component: FileFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                FileFieldComponent,
                TestWrapperComponent,
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
    template: '<nc-file-field [dataField]="field" taskId="666"></nc-file-field>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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

