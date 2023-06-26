import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAssignDialogComponent} from './user-assign-dialog.component';
import {
    ConfigurationService,
    MaterialModule,
    SnackBarModule, TestConfigurationService,
    TranslateLibModule,
    UserListService
} from 'netgrif-components-core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserAssignDialogComponent', () => {
    let component: UserAssignDialogComponent;
    let fixture: ComponentFixture<UserAssignDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule,
                SnackBarModule
            ],
            providers: [
                UserListService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                UserAssignDialogComponent,
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserAssignDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
