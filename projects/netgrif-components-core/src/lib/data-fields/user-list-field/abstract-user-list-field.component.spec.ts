import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractUserListFieldComponent } from './abstract-user-list-field.component';
import { Component, Inject, Optional } from '@angular/core';
import { SideMenuService } from '../../side-menu/services/side-menu.service';
import { TranslateService } from '@ngx-translate/core';
import { NAE_INFORM_ABOUT_INVALID_DATA } from '../models/invalid-data-policy-token';
import { UserListField } from './models/user-list-field';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLibModule } from '../../translate/translate-lib.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { expect } from '@ngbracket/ngx-layout/_private-utils/testing';
import {MatDialogModule} from '@angular/material/dialog';

describe('AbstractUserListFieldComponent', () => {
    let component: TestUserListFieldComponent;
    let fixture: ComponentFixture<TestUserListFieldComponent>;
    let service: SideMenuService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MaterialModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                MatDialogModule
            ],
            declarations: [TestUserListFieldComponent],
            providers: [
                TranslateService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestUserListFieldComponent);
        component = fixture.componentInstance;
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
    selector: 'ncc-test-userlistfield',
    template: ''
})
class TestUserListFieldComponent extends AbstractUserListFieldComponent {
    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
        this.dataField = new UserListField('', '', {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        }, undefined,
            undefined);
    }
}


