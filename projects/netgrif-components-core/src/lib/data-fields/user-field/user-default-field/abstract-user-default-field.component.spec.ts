import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MaterialModule} from "../../../material/material.module";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {TranslateLibModule} from "../../../translate/translate-lib.module";
import {SnackBarModule} from "../../../snack-bar/snack-bar.module";
import {SideMenuService} from "../../../side-menu/services/side-menu.service";
import {TranslateService} from "@ngx-translate/core";
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional, ChangeDetectionStrategy} from "@angular/core";
import {SnackBarService} from "../../../snack-bar/services/snack-bar.service";
import {UserField} from "../models/user-field";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractUserDefaultFieldComponent} from "./abstract-user-default-field.component";
import {FormControl} from "@angular/forms";
import {WrappedBoolean} from "../../data-field-template/models/wrapped-boolean";
import {MatDialog} from '@angular/material/dialog';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractUserDefaultFieldComponent', () => {
    let component: TestUserComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestUserComponent, TestWrapperComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule,
                SnackBarModule
            ],
            providers: [
                SideMenuService,
                TranslateService,
                {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                        dataField: new UserField('', '', {
                            required: true,
                            optional: true,
                            visible: true,
                            editable: true,
                            hidden: true
                        }, undefined, []),
                        formControlRef: new FormControl(),
                        showLargeLayout: new WrappedBoolean()
                    } as DataFieldPortalData<UserField>
                },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-user',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestUserComponent extends AbstractUserDefaultFieldComponent {
    constructor(matDialog: MatDialog,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<UserField>) {
        super(matDialog, snackbar, translate, dataFieldPortalData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-user></ncc-test-user>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {

}
