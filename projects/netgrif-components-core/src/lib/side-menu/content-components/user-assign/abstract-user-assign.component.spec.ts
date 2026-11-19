import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserListService} from '../../../user/services/user-list.service';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {Observable} from 'rxjs';
import {SideMenuControl} from '../../models/side-menu-control';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {SnackBarModule} from '../../../snack-bar/snack-bar.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {MaterialModule} from '../../../material/material.module';
import {Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import {AbstractUserAssignComponent} from './abstract-user-assign.component';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractUserAssignComponent', () => {
    let component: TestUserComponent;
    let fixture: ComponentFixture<TestUserComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestUserComponent],
            imports: [
                MaterialModule,
                TranslateLibModule,
                SnackBarModule
            ],
            providers: [
                UserListService,
                {provide: NAE_SIDE_MENU_CONTROL, useValue: new SideMenuControl(() => {
                    }, new Observable<boolean>(), null)},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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
class TestUserComponent extends AbstractUserAssignComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl) {
        super(_sideMenuControl);
    }
}
