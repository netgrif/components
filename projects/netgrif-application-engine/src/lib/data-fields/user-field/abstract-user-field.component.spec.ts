import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {AbstractUserFieldComponent} from './abstract-user-field.component';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {SnackBarModule} from '../../snack-bar/snack-bar.module';
import {UserField} from './models/user-field';

describe('AbstractUserFieldComponent', () => {
    let component: TestUserComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizedEventModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule,
                SnackBarModule
            ],
            declarations: [TestUserComponent, TestWrapperComponent],
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-user',
    template: ''
})
class TestUserComponent extends AbstractUserFieldComponent {
    constructor(protected _sideMenuService: SideMenuService,
                protected _snackbar: SnackBarService) {
        super(_sideMenuService, _snackbar);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-user [dataField]="field"> </nae-test-user>'
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