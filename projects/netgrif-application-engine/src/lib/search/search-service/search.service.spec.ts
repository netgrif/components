import {TestBed} from '@angular/core/testing';
import {SearchService} from './search.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CategoryFactory} from '../category-factory/category-factory';
import {CaseTitle} from '../models/category/case/case-title';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {TestCaseBaseFilterProvider} from '../../utility/tests/test-factory-methods';

describe('SearchService', () => {
    let service: SearchService;
    let categoryFactory: CategoryFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule
            ],
            providers: [
                CategoryFactory,
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(SearchService);
        categoryFactory = TestBed.inject(CategoryFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add predicate', () => {
        expect(service).toBeTruthy();
        expect(service.additionalFiltersApplied).toBeFalse();

        const predicate = categoryFactory.getWithDefaultOperator(CaseTitle).generatePredicate(['title']);
        const id = service.addPredicate(predicate);

        expect(service.additionalFiltersApplied).toBeTrue();
        expect(service.rootPredicate.getPredicateMap().has(id)).toBeTrue();
        expect(service.rootPredicate.getPredicateMap().get(id)).toBeTruthy();
    });

    it('should add hidden predicate with generator', () => {
        expect(service).toBeTruthy();
        expect(service.additionalFiltersApplied).toBeFalse();

        const generator = categoryFactory.getWithDefaultOperator(CaseTitle);
        generator.setOperands(['title']);
        const id = service.addGeneratedLeafPredicate(generator);

        expect(service.additionalFiltersApplied).toBeTrue();
        expect(service.rootPredicate.getPredicateMap().has(id)).toBeTrue();
        expect(service.rootPredicate.getPredicateMap().get(id)).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
