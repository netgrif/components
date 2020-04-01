import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAssignListComponent} from './user-assign-list.component';
import {UserAssignItemComponent} from './user-assign-item/user-assign-item.component';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {Component} from '@angular/core';
import {CovalentCommonModule} from '@covalent/core/common';

describe('UserAssignListComponent', () => {
    let component: UserAssignListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                CovalentCommonModule
            ],
            declarations: [
                UserAssignListComponent,
                UserAssignItemComponent,
                TestWrapperComponent
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-user-assign-list [userList]="users"></nae-user-assign-list>'
})
class TestWrapperComponent {
    users = [
        new UserValue('', '', '', '')
    ];
}
