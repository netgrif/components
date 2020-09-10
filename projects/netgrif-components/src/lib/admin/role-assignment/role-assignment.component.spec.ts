import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RoleAssignmentComponent} from './role-assignment.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {
    RoleAssignmentService,
    MaterialModule,
    TranslateLibModule,
    SnackBarModule,
    ConfigurationService,
    TestConfigurationService,
    AuthenticationMethodService,
    AuthenticationService,
    ErrorSnackBarComponent,
    SuccessSnackBarComponent,
    MockAuthenticationService,
    MockAuthenticationMethodService
} from '@netgrif/application-engine';


describe('RoleAssignmentComponent', () => {
    let component: RoleAssignmentComponent;
    let fixture: ComponentFixture<RoleAssignmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                SnackBarModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                RoleAssignmentService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                RoleAssignmentComponent
            ],
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
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

