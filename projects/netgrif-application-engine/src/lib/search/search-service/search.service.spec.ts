import {TestBed} from '@angular/core/testing';
import {SearchService} from './search.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CategoryFactory} from '../category-factory/category-factory';
import {CaseTitle} from '../models/category/case/case-title';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
                {provide: SearchService, useValue: new SearchService(SimpleFilter.empty(FilterType.CASE))},
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
