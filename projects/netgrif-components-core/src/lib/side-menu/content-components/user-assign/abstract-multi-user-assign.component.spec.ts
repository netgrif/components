import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserListService} from '../../../user/services/user-list.service';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {Observable} from 'rxjs';
import {SideMenuControl} from '../../models/side-menu-control';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {SnackBarModule} from '../../../snack-bar/snack-bar.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../../material/material.module';
import {Component, Inject} from '@angular/core';
import {AbstractMultiUserAssignComponent} from "./abstract-multi-user-assign.component";
import {UserValue} from "../../../data-fields/user-field/models/user-value";
import {expect} from "@angular/flex-layout/_private-utils/testing";

describe('AbstractMultiUserAssignComponent', () => {
    let component: TestUserComponent;
    let fixture: ComponentFixture<TestUserComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule,
                SnackBarModule
            ],
            providers: [
                UserListService,
                {provide: NAE_SIDE_MENU_CONTROL, useValue: new SideMenuControl(() => {
                    }, new Observable<boolean>(), null)},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                TestUserComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select', () => {
        component.userWasSelected(new UserValue('0', '', '', ''));
        expect(component.currentUsers).toBeTruthy();
        expect(component.currentUsers.find(u => u.id === '0')).toBeTruthy()
    });

    it('should unselect', () => {
        component.userWasSelected(new UserValue('0', '', '', ''));
        expect(component.currentUsers).toBeTruthy();
        expect(component.currentUsers.find(u => u.id === '0')).toBeTruthy()
        component.userWasUnselected(new UserValue('0', '', '', ''));
        expect(component.currentUsers.length === 0).toBeTruthy();
    });

    it('should getter', () => {
        expect(component.currentUsers).toBeTruthy();
        expect(component.initiallySelectedUsers).toBeTruthy();
        expect(component.roles).toBeTruthy();
        expect(component.negativeRoles).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-user',
    template: ''
})
class TestUserComponent extends AbstractMultiUserAssignComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl) {
        super(_sideMenuControl);
    }
}
