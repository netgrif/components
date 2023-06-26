import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {SideMenuService} from "../../../side-menu/services/side-menu.service";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../../material/material.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLibModule} from "../../../translate/translate-lib.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateService} from "@ngx-translate/core";
import {expect} from "@angular/flex-layout/_private-utils/testing";
import {UserValue} from "../../user-field/models/user-value";
import {Component, Inject, Optional} from "@angular/core";
import {AbstractUserListFieldComponent} from "../abstract-user-list-field.component";
import {SnackBarService} from "../../../snack-bar/services/snack-bar.service";
import {UserListField} from "../models/user-list-field";
import {
    AbstractUserAssignComponent
} from "../../../side-menu/content-components/user-assign/abstract-user-assign.component";
import {NAE_SIDE_MENU_CONTROL} from "../../../side-menu/side-menu-injection-token";
import {SideMenuControl} from "../../../side-menu/models/side-menu-control";
import {
    AbstractSideMenuContainerComponent
} from "../../../side-menu/side-menu-container/abstract-side-menu-container.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractUserListDefaultFieldComponent} from "./abstract-user-list-default-field.component";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/models/wrapped-boolean";
import {MatDialog} from '@angular/material/dialog';

describe('AbstractUserListDefaultFieldComponent', () => {
    let component: TestUserListFieldComponent;
    let fixture: ComponentFixture<TestUserListFieldComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MaterialModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            declarations: [TestUserListFieldComponent],
            providers: [
                TranslateService,
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new UserListField('', '', {
                                required: true,
                                optional: true,
                                visible: true,
                                editable: true,
                                hidden: true
                            }, undefined,
                            undefined),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<UserListField>
                }
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
class TestUserListFieldComponent extends AbstractUserListDefaultFieldComponent {
    constructor(matDialog: MatDialog,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<UserListField>) {
        super(matDialog, snackbar, translate, dataFieldPortalData);
    }
}
