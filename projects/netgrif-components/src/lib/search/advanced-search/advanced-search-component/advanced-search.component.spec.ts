import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AdvancedSearchComponent} from './advanced-search.component';
import {
    AllowedNetsService, AllowedNetsServiceFactory,
    CategoryFactory,
    ConfigurationService,
    MaterialModule, NAE_BASE_FILTER,
    NAE_SEARCH_CATEGORIES,
    SearchService, TestCaseBaseFilterProvider,
    TestConfigurationService, TestNoAllowedNetsFactory
} from '@netgrif/components-core';
import {SearchComponentModule} from '../../search.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AdvancedSearchComponent', () => {
    let component: AdvancedSearchComponent;
    let fixture: ComponentFixture<AdvancedSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                SearchComponentModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: NAE_SEARCH_CATEGORIES, useValue: []},
                CategoryFactory,
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvancedSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
