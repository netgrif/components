import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAssignListComponent} from './user-assign-list.component';
import {UserAssignItemComponent} from './user-assign-item/user-assign-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {
    ConfigurationService,
    ErrorSnackBarComponent,
    MaterialModule,
    TestConfigurationService,
    TranslateLibModule,
    UserListInjectedData,
    UserListService,
    UserValue
} from '@netgrif/components-core';

describe('UserAssignListComponent', () => {
    let component: UserAssignListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            providers: [
                UserListService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                UserAssignListComponent,
                UserAssignItemComponent,
                ErrorSnackBarComponent,
                TestWrapperComponent
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

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
    selector: 'nc-test-wrapper',
    template: '<nc-user-assign-list [searchUserControl]="formControl" [roles]="injectedData.roles"></nc-user-assign-list>'
})
class TestWrapperComponent {
    injectedData = {roles: [], value: new UserValue('5', 'admin', 'netgrif', 'super@netgrif.com')} as UserListInjectedData;
    formControl = new FormControl();
}
