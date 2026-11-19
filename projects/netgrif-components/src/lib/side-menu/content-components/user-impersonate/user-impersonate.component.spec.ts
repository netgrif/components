import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {UserImpersonateComponent} from './user-impersonate.component';
import {SideMenuUserImpersonateComponentModule} from './side-menu-user-impersonate-component.module';
import {Observable, of} from 'rxjs';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    CaseResourceService,
    ConfigurationService,
    FilterType,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    NAE_SIDE_MENU_CONTROL,
    SideMenuControl,
    SimpleFilter,
    TestConfigurationService,
    UserResourceService
} from '@netgrif/components-core';

describe('UserImpersonateComponent', () => {
    let component: UserImpersonateComponent;
    let fixture: ComponentFixture<UserImpersonateComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    SideMenuUserImpersonateComponentModule,
                    RouterTestingModule.withRoutes([])
                ],
                providers: [
                    {
                        provide: AuthenticationMethodService,
                        useClass: MockAuthenticationMethodService
                    },
                    {
                        provide: AuthenticationService,
                        useClass: MockAuthenticationService
                    },
                    {
                        provide: UserResourceService,
                        useClass: MockUserResourceService
                    },
                    {
                        provide: ConfigurationService,
                        useClass: TestConfigurationService
                    },
                    { provide: CaseResourceService, useClass: MockCaseResourceService },
                    {
                        provide: NAE_SIDE_MENU_CONTROL,
                        useValue: new SideMenuControl(
                            () => {},
                            new Observable<boolean>(),
                            null,
                            {
                                filter: new SimpleFilter('', FilterType.CASE, {
                                    process: { identifier: '__EMPTY__' }
                                })
                            }
                        )
                    },
                    provideHttpClient(withXhr(), withInterceptorsFromDi()),
                    provideHttpClientTesting()
                ]
            }).compileComponents();
        })
    );

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

class MockCaseResourceService {
    searchCases() {
        return of({
            content: [],
            pagination: {
                number: -1,
                size: 0,
                totalPages: 0,
                totalElements: 0
            }
        });
    }
}
