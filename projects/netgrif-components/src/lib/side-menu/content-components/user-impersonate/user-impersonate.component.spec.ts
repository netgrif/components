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
import {UserImpersonateComponent} from './user-impersonate.component';
import {UserImpersonateListComponent} from './user-impersonate-list/user-impersonate-list.component';
import {UserImpersonateItemComponent} from './user-impersonate-list/user-impersonate-item/user-impersonate-item.component';

describe('UserImpersonateComponent', () => {
    let component: UserImpersonateComponent;
    let fixture: ComponentFixture<UserImpersonateComponent>;

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
                UserImpersonateComponent,
                UserImpersonateListComponent,
                UserImpersonateItemComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserImpersonateComponent);
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
