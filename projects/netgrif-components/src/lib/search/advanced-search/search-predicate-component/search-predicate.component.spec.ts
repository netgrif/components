import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchPredicateComponent} from './search-predicate.component';
import {Component, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {
    AuthenticationMethodService,
    CategoryFactory,
    ConfigurationService,
    EditableElementaryPredicate,
    MaterialModule,
    MockAuthenticationMethodService,
    NAE_SEARCH_CATEGORIES,
    SearchService,
    TestConfigurationService,
    TranslateLibModule,
    AdvancedSearchComponentInitializationService,
    NAE_BASE_FILTER,
    TestCaseBaseFilterProvider,
    AllowedNetsService,
    TestNoAllowedNetsFactory,
    AllowedNetsServiceFactory, NAE_DEFAULT_CASE_SEARCH_CATEGORIES, DefaultSearchCategoriesModule
} from '@netgrif/components-core';
import {Subject} from 'rxjs';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {AdvancedSearchComponentModule} from '../advanced-search.module';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('SearchPredicateComponent', () => {
    let component: SearchPredicateComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [
                AdvancedSearchComponentModule,
                MaterialModule,
                TranslateLibModule,
                DefaultSearchCategoriesModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                CategoryFactory,
                {provide: NAE_SEARCH_CATEGORIES, useExisting: NAE_DEFAULT_CASE_SEARCH_CATEGORIES},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                AdvancedSearchComponentInitializationService,
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-search-predicate [predicate]="predicate" [remove$]="remove$" [predicateId]="0"></nc-search-predicate>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent implements OnDestroy {

    public predicate = new EditableElementaryPredicate();
    public remove$ = new Subject();

    ngOnDestroy(): void {
        this.remove$.complete();
    }
}
