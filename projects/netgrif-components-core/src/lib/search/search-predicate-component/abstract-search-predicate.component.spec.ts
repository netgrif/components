import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AbstractSearchPredicateComponent} from './abstract-search-predicate.component';
import {Component, Inject, OnDestroy, Type} from '@angular/core';
import {NAE_DEFAULT_CASE_SEARCH_CATEGORIES, NAE_SEARCH_CATEGORIES} from '../category-factory/search-categories-injection-token';
import {Category} from '../models/category/category';
import {LoggerService} from '../../logger/services/logger.service';
import {CategoryFactory} from '../category-factory/category-factory';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    TestCaseBaseFilterProvider,
    TestNoAllowedNetsFactory
} from '../../utility/tests/test-factory-methods';
import {EditableElementaryPredicate} from '../models/predicate/editable-elementary-predicate';
import {Subject} from 'rxjs';
import {MaterialModule} from '../../material/material.module';
import {SearchService} from '../search-service/search.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {
    AdvancedSearchComponentInitializationService
} from '../advanced-search-component-initialization-service/advanced-search-component-initialization.service';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import {DefaultSearchCategoriesModule} from '../category-factory/default-search-categories.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AbstractSearchPredicateComponent', () => {
    let component: TestSearchPredicateComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule,
                DefaultSearchCategoriesModule,
                NoopAnimationsModule
            ],
            declarations: [
                TestSearchPredicateComponent,
                TestWrapperComponent
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
    selector: 'ncc-search-predicate',
    template: ''
})
class TestSearchPredicateComponent extends AbstractSearchPredicateComponent {
    constructor(@Inject(NAE_SEARCH_CATEGORIES) searchCategories: Array<Type<Category<any>>>,
                logger: LoggerService,
                initializationService: AdvancedSearchComponentInitializationService,
                categoryFactory: CategoryFactory) {
        super(searchCategories, logger, initializationService, categoryFactory);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-search-predicate [predicate]="predicate" [predicateId]="0" [remove$]="remove$"></ncc-search-predicate>'
})
class TestWrapperComponent implements OnDestroy {

    predicate = new EditableElementaryPredicate();
    remove$ = new Subject();

    ngOnDestroy(): void {
        this.remove$.complete();
    }
}
