import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiUserAssignDialogComponent} from './multi-user-assign-dialog.component';
import {
    ConfigurationService,
    MaterialModule, TestConfigurationService,
    TranslateLibModule,
    UserListService
} from 'netgrif-components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserAssignComponent} from '../../side-menu/content-components/user-assign/user-assign.component';
import {
    UserAssignListComponent
} from '../../side-menu/content-components/user-assign/user-assign-list/user-assign-list.component';
import {
    UserAssignItemComponent
} from '../../side-menu/content-components/user-assign/user-assign-list/user-assign-item/user-assign-item.component';
import {MatDialogModule} from '@angular/material/dialog';
import {
    SideMenuMultiUserAssignComponentModule
} from '../../side-menu/content-components/multi-user-assign/side-menu-multi-user-assign-component.module';

describe('MultiUserAssignDialogComponent', () => {
    let component: MultiUserAssignDialogComponent;
    let fixture: ComponentFixture<MultiUserAssignDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                MatDialogModule,
                SideMenuMultiUserAssignComponentModule
            ],
            providers: [
                UserListService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                MultiUserAssignDialogComponent
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiUserAssignDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
