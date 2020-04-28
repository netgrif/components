import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserFieldComponent} from './user-field.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {UserField} from './models/user-field';
import {MaterialModule} from '../../material/material.module';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserFieldComponent', () => {
    let component: UserFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, AngularResizedEventModule, BrowserAnimationsModule, HttpClientTestingModule],
            declarations: [UserFieldComponent, TestWrapperComponent],
            providers: [SideMenuService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-user-field [dataField]="field"> </nae-user-field>'
})
class TestWrapperComponent {
    field = new UserField('', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, []);
}
