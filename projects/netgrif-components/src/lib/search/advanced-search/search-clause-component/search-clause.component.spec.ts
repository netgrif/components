import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchClauseComponent} from './search-clause.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {
    AuthenticationMethodService,
    BooleanOperator,
    CategoryFactory,
    ConfigurationService,
    defaultCaseSearchCategoriesFactory,
    MaterialModule,
    MockAuthenticationMethodService,
    NAE_SEARCH_CATEGORIES,
    SearchService,
    TestConfigurationService,
    TranslateLibModule,
    AdvancedSearchComponentInitializationService,
    EditableClausePredicateWithGenerators,
    NAE_BASE_FILTER, TestCaseBaseFilterProvider, AllowedNetsService, AllowedNetsServiceFactory, TestNoAllowedNetsFactory
} from '@netgrif/application-engine';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AdvancedSearchComponentModule} from '../advanced-search.module';

describe('SearchClauseComponent', () => {
    let component: SearchClauseComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                AdvancedSearchComponentModule,
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            declarations: [
                TestWrapperComponent
            ],
            providers: [
                CategoryFactory,
                {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                AdvancedSearchComponentInitializationService,
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-search-clause [predicate]="predicate" [remove$]="remove$" [predicateId]="0"></nc-search-clause>'
})
class TestWrapperComponent implements OnDestroy {

    public predicate = new EditableClausePredicateWithGenerators(BooleanOperator.OR);
    public remove$ = new Subject();

    ngOnDestroy(): void {
        this.remove$.complete();
    }
}