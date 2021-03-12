import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CaseSearchComponent} from './case-search.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
    AuthenticationMethodService,
    AuthenticationService,
    CaseViewService,
    CategoryFactory,
    CaseViewServiceFactory,
    ConfigurationService,
    MockAuthenticationMethodService,
    MockAuthenticationService,
    MockUserResourceService,
    SearchService,
    TestCaseViewFactory,
    TestConfigurationService,
    UserResourceService, NAE_BASE_FILTER, TestCaseBaseFilterProvider
} from '@netgrif/application-engine';
import {SearchComponentModule} from '../../search.module';

describe('CaseSearchComponent', () => {
    let component: CaseSearchComponent;
    let fixture: ComponentFixture<CaseSearchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                SearchComponentModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                CaseViewServiceFactory,
                CategoryFactory,
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {
                    provide: CaseViewService,
                    useFactory: TestCaseViewFactory,
                    deps: [CaseViewServiceFactory]
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
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
