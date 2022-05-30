import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AngularResizedEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AngularResizeEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Optional} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {AbstractUserFieldComponent} from './abstract-user-field.component';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {UserField} from './models/user-field';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {TranslateService} from '@ngx-translate/core';

describe('AbstractUserFieldComponent', () => {
    let component: TestUserComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule,
                SnackBarModule
            ],
            declarations: [TestUserComponent, TestWrapperComponent],
            providers: [
                SideMenuService,
                TranslateService
            ],
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-user',
    template: ''
})
class TestUserComponent extends AbstractUserFieldComponent {
    constructor(sideMenuService: SideMenuService,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(sideMenuService, snackbar, translate, informAboutInvalidData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-user [dataField]="field"> </ncc-test-user>'
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
