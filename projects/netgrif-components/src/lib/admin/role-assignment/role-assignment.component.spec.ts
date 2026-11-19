import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {RoleAssignmentComponent} from './role-assignment.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    ErrorSnackBarComponent,
    MaterialModule,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    RoleAssignmentService,
    SnackBarModule,
    SuccessSnackBarComponent,
    TestConfigurationService,
    TranslateLibModule
} from '@netgrif/components-core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('RoleAssignmentComponent', () => {
    let component: RoleAssignmentComponent;
    let fixture: ComponentFixture<RoleAssignmentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [RoleAssignmentComponent],
            imports: [
                MaterialModule,
                TranslateLibModule,
                SnackBarModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                RoleAssignmentService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoleAssignmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

