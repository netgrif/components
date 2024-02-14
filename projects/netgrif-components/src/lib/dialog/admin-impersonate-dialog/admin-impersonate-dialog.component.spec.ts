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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {
    SideMenuAdminImpersonateComponentModule
} from '../../side-menu/content-components/admin-impersonate/side-menu-admin-impersonate-component.module';
import {RouterTestingModule} from "@angular/router/testing";

describe('AdminImpersonateDialogComponent', () => {
    let component: AdminImpersonateDialogComponent;
    let fixture: ComponentFixture<AdminImpersonateDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
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
                { provide: UserResourceService, useClass: MockUserResourceService }
            ],
            declarations: [
                AdminImpersonateDialogComponent,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminImpersonateDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
