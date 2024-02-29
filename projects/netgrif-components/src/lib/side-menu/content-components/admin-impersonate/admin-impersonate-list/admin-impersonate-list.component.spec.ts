import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AdminImpersonateListComponent} from './admin-impersonate-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {
    ConfigurationService,
    ErrorSnackBarComponent, ImpersonationUserListService,
    MaterialModule,
    TestConfigurationService,
    TranslateLibModule,
    UserListInjectedData,
    UserListService,
    UserValue
} from '@netgrif/components-core';
import {AdminImpersonateItemComponent} from './admin-impersonate-item/admin-impersonate-item.component';

describe('AdminImpersonateListComponent', () => {
    let component: AdminImpersonateListComponent;
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
                {provide: UserListService, useClass: ImpersonationUserListService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                AdminImpersonateListComponent,
                AdminImpersonateItemComponent,
                ErrorSnackBarComponent,
                TestWrapperComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
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
    template: '<nc-user-impersonate-list [searchUserControl]="formControl" [roles]="injectedData.roles"></nc-user-impersonate-list>'
})
class TestWrapperComponent {
    injectedData = {roles: [], value: new UserValue('5', 'admin', 'netgrif', 'super@netgrif.com')} as UserListInjectedData;
    formControl = new FormControl();
}
