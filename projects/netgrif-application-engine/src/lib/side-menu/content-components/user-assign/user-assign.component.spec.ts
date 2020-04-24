import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAssignComponent} from './user-assign.component';
import {MaterialModule} from '../../../material/material.module';
import {UserAssignListComponent} from './user-assign-list/user-assign-list.component';
import {UserAssignItemComponent} from './user-assign-list/user-assign-item/user-assign-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {Observable} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';

describe('UserAssignComponent', () => {
    let component: UserAssignComponent;
    let fixture: ComponentFixture<UserAssignComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule
            ],
            declarations: [
                UserAssignComponent,
                UserAssignListComponent,
                UserAssignItemComponent
            ],
            providers: [
                { provide: NAE_SIDE_MENU_CONTROL, useValue: new SideMenuControl(() => {
                    }, new Observable<boolean>(), null)},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserAssignComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
