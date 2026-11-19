import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AdminImpersonateListComponent} from './admin-impersonate-list.component';
import {Component, NO_ERRORS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {provideHttpClientTesting} from '@angular/common/http/testing';
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
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AdminImpersonateListComponent', () => {
    let component: AdminImpersonateListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                AdminImpersonateListComponent,
                AdminImpersonateItemComponent,
                ErrorSnackBarComponent,
                TestWrapperComponent
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                {provide: UserListService, useClass: ImpersonationUserListService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
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
    template: '<nc-user-impersonate-list [searchUserControl]="formControl" [roles]="injectedData.roles"></nc-user-impersonate-list>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    injectedData = {roles: [], value: new UserValue('5', 'admin', 'netgrif', 'super@netgrif.com')} as UserListInjectedData;
    formControl = new FormControl();
}
