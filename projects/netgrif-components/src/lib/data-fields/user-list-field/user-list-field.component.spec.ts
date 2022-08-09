import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListFieldComponent } from './user-list-field.component';
import { MaterialModule, SideMenuService, TranslateLibModule, UserListField } from 'netgrif-components-core';
import { AngularResizeEventModule } from 'angular-resize-event';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserFieldComponent } from '../user-field/user-field.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserListFieldComponent', () => {
    let component: UserListFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizeEventModule, BrowserAnimationsModule, HttpClientTestingModule, TranslateLibModule],
            declarations: [UserFieldComponent, TestWrapperComponent],
            providers: [SideMenuService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-user-list-field [dataField]="field"> </nc-user-list-field>'
})
class TestWrapperComponent {
    field = new UserListField('', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined);
}
