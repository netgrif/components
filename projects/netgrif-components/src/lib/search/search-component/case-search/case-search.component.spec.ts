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
    TestCaseSearchServiceFactory,
    TestCaseViewFactory,
    TestConfigurationService,
    UserResourceService
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
                {
                    provide: SearchService,
                    useFactory: TestCaseSearchServiceFactory
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
