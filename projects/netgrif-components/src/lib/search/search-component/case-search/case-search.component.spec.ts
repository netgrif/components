import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CaseSearchComponent} from './case-search.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {
    AuthenticationMethodService,
    AuthenticationService,
    CategoryFactory,
    ConfigurationService,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    SearchService,
    TestConfigurationService,
    UserResourceService, NAE_BASE_FILTER, TestCaseBaseFilterProvider, AllowedNetsService, AllowedNetsServiceFactory,
    TestNoAllowedNetsFactory,
    ViewIdService
} from '@netgrif/components-core';
import {SearchComponentModule} from '../../search.module';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('CaseSearchComponent', () => {
    let component: CaseSearchComponent;
    let fixture: ComponentFixture<CaseSearchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                SearchComponentModule
            ],
            providers: [
                CategoryFactory,
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                {provide: ViewIdService, useValue: {viewId: 'test_view_id'}},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseSearchComponent);
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
