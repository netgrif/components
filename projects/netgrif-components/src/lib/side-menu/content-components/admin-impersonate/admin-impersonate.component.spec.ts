import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {
    ConfigurationService, ImpersonationUserListService,
    MaterialModule,
    NAE_SIDE_MENU_CONTROL,
    SideMenuControl,
    SnackBarModule,
    TestConfigurationService,
    TranslateLibModule,
    UserListService
} from '@netgrif/components-core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs';
import {AdminImpersonateComponent} from './admin-impersonate.component';
import {AdminImpersonateListComponent} from './admin-impersonate-list/admin-impersonate-list.component';
import {
    AdminImpersonateItemComponent
} from './admin-impersonate-list/admin-impersonate-item/admin-impersonate-item.component';

describe('AdminImpersonateComponent', () => {
    let component: AdminImpersonateComponent;
    let fixture: ComponentFixture<AdminImpersonateComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateLibModule,
                SnackBarModule
            ],
            providers: [
                {provide: UserListService, useClass: ImpersonationUserListService},
                {
                    provide: NAE_SIDE_MENU_CONTROL, useValue: new SideMenuControl(() => {
                    }, new Observable<boolean>(), null)
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                AdminImpersonateComponent,
                AdminImpersonateListComponent,
                AdminImpersonateItemComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminImpersonateComponent);
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
