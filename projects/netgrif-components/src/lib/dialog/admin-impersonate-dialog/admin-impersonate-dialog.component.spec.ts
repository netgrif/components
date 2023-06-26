import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminImpersonateDialogComponent} from './admin-impersonate-dialog.component';
import {
    ConfigurationService,
    ImpersonationUserListService,
    MaterialModule,
    SnackBarModule, TestConfigurationService,
    TranslateLibModule,
    UserListService
} from 'netgrif-components-core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatDialog} from '@angular/material/dialog';
import {
    SideMenuAdminImpersonateComponentModule
} from '../../side-menu/content-components/admin-impersonate/side-menu-admin-impersonate-component.module';

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
                MatDialog,
                SideMenuAdminImpersonateComponentModule,
            ],
            providers: [
                {provide: UserListService, useClass: ImpersonationUserListService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
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
