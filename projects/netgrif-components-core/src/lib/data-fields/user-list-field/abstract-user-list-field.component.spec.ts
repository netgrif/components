import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AbstractUserListFieldComponent } from './abstract-user-list-field.component';
import { Component, Inject, Optional } from '@angular/core';
import { SideMenuService } from '../../side-menu/services/side-menu.service';
import { SnackBarService } from '../../snack-bar/services/snack-bar.service';
import { TranslateService } from '@ngx-translate/core';
import { NAE_INFORM_ABOUT_INVALID_DATA } from '../models/invalid-data-policy-token';
import { UserListField } from './models/user-list-field';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLibModule } from '../../translate/translate-lib.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    AbstractSideMenuContainerComponent
} from '../../side-menu/side-menu-container/abstract-side-menu-container.component';
import { NAE_SIDE_MENU_CONTROL } from '../../side-menu/side-menu-injection-token';
import { SideMenuControl } from '../../side-menu/models/side-menu-control';
import {
    AbstractUserAssignComponent
} from '../../side-menu/content-components/user-assign/abstract-user-assign.component';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import { UserValue } from '../user-field/models/user-value';

describe('AbstractUserListFieldComponent', () => {
    let component: TestUserListFieldComponent;
    let fixture: ComponentFixture<TestUserListFieldComponent>;
    let sideMenuComponent: TestSideMenuComponent;
    let sideMenuFixture: ComponentFixture<TestSideMenuComponent>;
    let service: SideMenuService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MaterialModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            declarations: [TestUserListFieldComponent, TestSideMenuComponent],
            providers: [
                TranslateService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestUserListFieldComponent);
        sideMenuFixture = TestBed.createComponent(TestSideMenuComponent);
        service = TestBed.inject(SideMenuService);
        component = fixture.componentInstance;
        sideMenuComponent = sideMenuFixture.componentInstance;
        fixture.detectChanges();
        sideMenuFixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open and close', (done) => {
        component.selectAbstractUser(TestAssignUserComponent);
        service.close({opened: true, message: 'Test',
            data: [new UserValue('test', 'name', 'surname', 'test@email.com')]});
        expect(component.dataField.value.userValues.get('test').id === 'test').toBeTruthy();
        done();
    });

    it('should remove', (done) => {
        component.selectAbstractUser(TestAssignUserComponent);
        service.close({opened: true, message: 'Test',
            data: [new UserValue('test', 'name', 'surname', 'test@email.com')]});
        expect(component.dataField.value.userValues.get('test').id === 'test').toBeTruthy();
        component.removeAbstractUser('test');
        expect(component.dataField.value.userValues.size === 0).toBeTruthy();
        done();
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
    constructor(sideMenuService: SideMenuService,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(sideMenuService, snackbar, translate, informAboutInvalidData);
        this.dataField = new UserListField('', '', {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        }, undefined);
    }
}

@Component({
    selector: 'ncc-test-import',
    template: '<input type="file" id="sidemenu-fileUpload" name="fileUpload" multiple="multiple" accept="text/xml"/>'
})
class TestAssignUserComponent extends AbstractUserAssignComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl) {
        super(_sideMenuControl);
    }
}

@Component({
    selector: 'ncc-test-sidemenu',
    template: '<mat-sidenav-container class="side-menu-container">\n' +
        '    <mat-sidenav #rightSideMenu mode="over" position="end" class="side-menu" ngClass.lt-sm="side-menu-size-mobile"' +
        ' [ngClass.gt-xs]="portalWrapper.size">\n' +
        '        <ng-template [cdkPortalOutlet]="portalWrapper.portal"></ng-template>\n' +
        '    </mat-sidenav>\n' +
        '    <mat-sidenav-content>\n' +
        '        <ng-content></ng-content>\n' +
        '    </mat-sidenav-content>\n' +
        '</mat-sidenav-container>'
})
class TestSideMenuComponent extends AbstractSideMenuContainerComponent {
    constructor(protected _sideMenuService: SideMenuService) {
        super(_sideMenuService);
    }
}
