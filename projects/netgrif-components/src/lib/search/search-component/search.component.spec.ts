import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SearchComponentModule} from '../search.module';
import {
    AuthenticationMethodService,
    AuthenticationService,
    ConfigurationService,
    MaterialModule,
    MockAuthenticationService,
    MockUserResourceService, NAE_BASE_FILTER,
    SearchService, TestCaseBaseFilterProvider,
    TestConfigurationService,
    TranslateLibModule,
    UserResourceService,
    AllowedNetsService,
    TestNoAllowedNetsFactory,
    AllowedNetsServiceFactory,
    NAE_SEARCH_CATEGORIES,
    defaultCaseSearchCategoriesFactory,
    CategoryFactory,
    ViewIdService
} from '@netgrif/application-engine';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                SearchComponentModule,
                NoopAnimationsModule,
            ],
            providers: [
                AuthenticationMethodService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
                CategoryFactory,
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: ViewIdService, useValue: {viewId: 'test_view_id'}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
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
