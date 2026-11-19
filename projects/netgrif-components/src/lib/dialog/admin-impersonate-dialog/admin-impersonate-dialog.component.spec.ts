import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminImpersonateDialogComponent} from './admin-impersonate-dialog.component';
import {
    ConfigurationService,
    ImpersonationUserListService,
    MaterialModule,
    SnackBarModule, TestConfigurationService,
    TranslateLibModule,
    UserListService,
    AuthenticationMethodService,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    AuthenticationService,
    UserResourceService,
    MockUserResourceService
} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {
    SideMenuAdminImpersonateComponentModule
} from '../../side-menu/content-components/admin-impersonate/side-menu-admin-impersonate-component.module';
import {RouterTestingModule} from "@angular/router/testing";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AdminImpersonateDialogComponent', () => {
    let component: AdminImpersonateDialogComponent;
    let fixture: ComponentFixture<AdminImpersonateDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdminImpersonateDialogComponent],
            imports: [
                MaterialModule,
                TranslateLibModule,
                SnackBarModule,
                MatDialogModule,
                RouterTestingModule.withRoutes([]),
                SideMenuAdminImpersonateComponentModule,
            ],
            providers: [
                {provide: UserListService, useClass: ImpersonationUserListService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                { provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService },
                { provide: AuthenticationService, useClass: MockAuthenticationService },
                { provide: UserResourceService, useClass: MockUserResourceService },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminImpersonateDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
