import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAssignComponent} from './user-assign.component';
import {MaterialModule} from '../../material/material.module';
import {UserAssignListComponent} from './user-assign-list/user-assign-list.component';
import {UserAssignItemComponent} from './user-assign-list/user-assign-item/user-assign-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NAE_SIDE_MENU_DATA} from '../side-menu-injection-token/side-menu-injection-token.module';

describe('UserAssignComponent', () => {
    let component: UserAssignComponent;
    let fixture: ComponentFixture<UserAssignComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                BrowserAnimationsModule
            ],
            declarations: [
                UserAssignComponent,
                UserAssignListComponent,
                UserAssignItemComponent
            ],
            providers: [
                {provide: NAE_SIDE_MENU_DATA, useValue: {userFieldService: null}}
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
});
