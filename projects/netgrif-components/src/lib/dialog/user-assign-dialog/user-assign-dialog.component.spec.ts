import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAssignDialogComponent} from './user-assign-dialog.component';
import {
    ConfigurationService,
    MaterialModule,
    SnackBarModule, TestConfigurationService,
    TranslateLibModule,
    UserListService,
    AuthenticationMethodService,
    MockAuthenticationMethodService,
    AuthenticationService,
    MockAuthenticationService,
    MockUserResourceService,
    UserResourceService
} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('UserAssignDialogComponent', () => {
    let component: UserAssignDialogComponent;
    let fixture: ComponentFixture<UserAssignDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserAssignDialogComponent],
            imports: [
                MaterialModule,
                TranslateLibModule,
                SnackBarModule
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                { provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService },
                { provide: AuthenticationService, useClass: MockAuthenticationService },
                { provide: UserResourceService, useClass: MockUserResourceService },
                UserListService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserAssignDialogComponent);
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
