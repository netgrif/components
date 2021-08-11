import {TestBed} from '@angular/core/testing';
import {SearchService} from './search.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CategoryFactory} from '../category-factory/category-factory';
import {CaseTitle} from '../models/category/case/case-title';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {TestCaseBaseFilterProvider, TestNoAllowedNetsFactory} from '../../utility/tests/test-factory-methods';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import {CaseCreationDate} from '../models/category/case/case-creation-date';
import moment from 'moment';
import {CaseVisualId} from '../models/category/case/case-visual-id';
import {CaseSearchRequestBody} from '../../filter/models/case-search-request-body';
import {FilterMetadata} from '../models/persistance/filter-metadata';
import {FilterType} from '../../filter/models/filter-type';
import {of} from 'rxjs';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {PetriNetRequestBody} from '../../resources/interface/petri-net-request-body';

describe('SearchService', () => {
    let service: SearchService;
    let categoryFactory: CategoryFactory;

    describe('with static base filter', () => {

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
                    {provide: ConfigurationService, useClass: TestConfigurationService},
                    {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
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

        describe('serialization / deserialization', () => {
            let serializedSearch: FilterMetadata;

            beforeEach(() => {
                const predicate1 = categoryFactory.getWithDefaultOperator(CaseTitle);
                predicate1.setOperands(['title']);

                const predicate2 = categoryFactory.getWithDefaultOperator(CaseCreationDate);
                predicate2.setOperands([moment('2021-03-31').valueOf()]);

                const predicate3 = categoryFactory.getWithDefaultOperator(CaseVisualId);
                predicate3.setOperands(['visualId']);

                const meta1 = predicate1.createMetadata();
                expect(meta1).toBeTruthy();
                const meta2 = predicate2.createMetadata();
                expect(meta2).toBeTruthy();
                const meta3 = predicate3.createMetadata();
                expect(meta3).toBeTruthy();

                serializedSearch = {
                    filterType: FilterType.CASE,
                    predicateMetadata: [[meta1, meta2], [meta3]],
                    searchCategories: [] // they don't play a role for this test
                };
            });

            it('should deserialize saved search', (done) => {
                expect(service.additionalFiltersApplied).toBeFalse();

                service.loadFromMetadata(serializedSearch);
                service.activeFilter$.subscribe(f => {
                    expect(service.additionalFiltersApplied).toBeTrue();

                    expect(f).toBeTruthy();
                    const filters = f.getRequestBody() as Array<CaseSearchRequestBody>;
                    expect(Array.isArray(filters)).toBeTrue();
                    expect(filters.length).toBe(2);
                    expect(filters[0]).toEqual({});
                    expect(filters[1].query).toBeTruthy();

                    done();
                });
            });

            it('should serialize search', (done) => {
                expect(service.additionalFiltersApplied).toBeFalse();

                service.loadFromMetadata(serializedSearch);
                service.activeFilter$.subscribe(f => {
                    expect(service.additionalFiltersApplied).toBeTrue();

                    const serialized = service.createPredicateMetadata();
                    expect(serialized).toBeTruthy();
                    expect(serialized).toEqual(serializedSearch.predicateMetadata);

                    done();
                });
            });
        });

    });

    describe('with Observable base filter', () => {

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
                        useValue: {filter: of(SimpleFilter.emptyCaseFilter()), filterType: FilterType.CASE}
                    },
                    {provide: ConfigurationService, useClass: TestConfigurationService},
                    {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
                ]
            });
            service = TestBed.inject(SearchService);
            categoryFactory = TestBed.inject(CategoryFactory);
        });

        it('should be created', (done) => {
            expect(service).toBeTruthy();
            service.activeFilter$.subscribe(filter => {
                expect(!Array.isArray(filter.getRequestBody())).toBeTrue();
                expect(filter.type === FilterType.CASE).toBeTrue();

                if (Object.keys(filter.getRequestBody()).length === 0) {
                    // empty filter
                    done();
                } else {
                    expect(!Array.isArray((filter.getRequestBody as CaseSearchRequestBody)?.process)).toBeTrue();
                    expect(
                        ((filter.getRequestBody as CaseSearchRequestBody)?.process as PetriNetRequestBody)?.identifier === '__EMPTY__'
                    ).toBeTrue();
                }
            });
        });

    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
