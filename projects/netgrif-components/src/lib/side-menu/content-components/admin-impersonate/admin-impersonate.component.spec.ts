import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {
    ConfigurationService,
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
import {UserImpersonateListComponent} from './user-impersonate-list/user-impersonate-list.component';
import {UserImpersonateItemComponent} from './user-impersonate-list/user-impersonate-item/user-impersonate-item.component';

describe('UserImpersonateComponent', () => {
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
                UserListService,
                {
                    provide: NAE_SIDE_MENU_CONTROL, useValue: new SideMenuControl(() => {
                    }, new Observable<boolean>(), null)
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                AdminImpersonateComponent,
                UserImpersonateListComponent,
                UserImpersonateItemComponent
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
