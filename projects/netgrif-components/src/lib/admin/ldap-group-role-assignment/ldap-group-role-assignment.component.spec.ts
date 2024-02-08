import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
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
import {LdapGroupRoleAssignmentComponent} from './ldap-group-role-assignment.component';


describe('LdapGroupRoleAssignmentComponent', () => {
    let component: LdapGroupRoleAssignmentComponent;
    let fixture: ComponentFixture<LdapGroupRoleAssignmentComponent>;

    beforeEach(waitForAsync(() => {
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
                LdapGroupRoleAssignmentComponent
            ],

        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LdapGroupRoleAssignmentComponent);
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

