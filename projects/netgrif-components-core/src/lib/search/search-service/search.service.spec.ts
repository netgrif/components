import {TestBed} from '@angular/core/testing';
import {SearchService} from './search.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CategoryFactory} from '../category-factory/category-factory';
import {CaseTitle} from '../models/category/case/case-title';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {
    TestCaseBaseFilterProvider,
    TestNoAllowedNetsFactory,
    TestTaskBaseFilterProvider,
} from '../../utility/tests/test-factory-methods';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import {CaseSearchRequestBody} from '../../filter/models/case-search-request-body';
import {FilterType} from '../../filter/models/filter-type';
import {of} from 'rxjs';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {PetriNetRequestBody} from '../../resources/interface/petri-net-request-body';
import {TaskSearchRequestBody} from "../../filter/models/task-search-request-body";
import {
    MockUserService,
    User,
    UserService
} from "@netgrif/components-core";
import {Injectable} from "@angular/core";
import {PfqlVisitor} from "../../pfql/pfql-visitor";
import {AuthenticationModule} from "../../authentication/authentication.module";
import {NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY} from "../category-factory/search-categories-injection-token";

describe('SearchService', () => {
    let service: SearchService;
    let categoryFactory: CategoryFactory;

    describe('with static case base filter', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    NoopAnimationsModule,
                    HttpClientTestingModule,
                    AuthenticationModule
                ],
                providers: [
                    CategoryFactory,
                    SearchService,
                    PfqlVisitor,
                    {provide: NAE_BASE_FILTER, useFactory: TestCaseBaseFilterProvider},
                    {provide: ConfigurationService, useClass: TestConfigurationService},
                    {provide: UserService, useClass: CustomMockUserService},
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

        it('should load pfql query in case category', (done) => {
            expect(service.additionalFiltersApplied).toBeFalse();

            service.loadFromPfql('cases: title neq \'someOtherTitle\'');
            service.activeFilter$.subscribe(f => {
                expect(service.additionalFiltersApplied).toBeTrue();

                expect(f).toBeTruthy();
                const filters = f.getRequestBody() as Array<CaseSearchRequestBody>;
                expect(Array.isArray(filters)).toBeTrue();
                expect(filters.length).toBe(2);
                expect(filters[0]).toEqual({});
                expect(filters[1].query).toEqual('cases: title neq \'someOtherTitle\'');

                done();
            });
        });

        afterEach(() => {
            TestBed.resetTestingModule();
        });
    });

    describe('with static task base filter', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    NoopAnimationsModule,
                    HttpClientTestingModule,
                    AuthenticationModule
                ],
                providers: [
                    CategoryFactory,
                    SearchService,
                    PfqlVisitor,
                    {provide: NAE_BASE_FILTER, useFactory: TestTaskBaseFilterProvider},
                    {provide: ConfigurationService, useClass: TestConfigurationService},
                    {provide: UserService, useClass: CustomMockUserService},
                    {provide: NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY, useValue: true},
                    {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
                ]
            });
            service = TestBed.inject(SearchService);
            categoryFactory = TestBed.inject(CategoryFactory);
        });

        it('should load pfql query in task category', (done) => {
            expect(service.additionalFiltersApplied).toBeFalse();

            service.loadFromPfql('tasks: transitionId eq \'myTransition\'');
            service.activeFilter$.subscribe(f => {
                expect(service.additionalFiltersApplied).toBeTrue();

                expect(f).toBeTruthy();
                const filters = f.getRequestBody() as Array<TaskSearchRequestBody>;
                expect(Array.isArray(filters)).toBeTrue();
                expect(filters.length).toBe(2);
                expect(filters[0]).toEqual({});
                expect(filters[1].query).toEqual('tasks: transitionId eq \'myTransition\'');

                done();
            });
        });

        afterEach(() => {
            TestBed.resetTestingModule();
        });
    });

    describe('with Observable base filter', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    NoopAnimationsModule,
                    HttpClientTestingModule,
                    AuthenticationModule
                ],
                providers: [
                    CategoryFactory,
                    SearchService,
                    PfqlVisitor,
                    {
                        provide: NAE_BASE_FILTER,
                        useValue: {filter: of(SimpleFilter.emptyCaseFilter()), filterType: FilterType.CASE}
                    },
                    {provide: ConfigurationService, useClass: TestConfigurationService},
                    {provide: UserService, useClass: CustomMockUserService},
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

        afterEach(() => {
            TestBed.resetTestingModule();
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Injectable()
class CustomMockUserService extends MockUserService {
    constructor() {
        super();
        this._user = new User('123', 'test@netgrif.com', 'Test', 'User', ['ROLE_USER'], [{
            stringId: 'id',
            name: 'id',
            description: '',
            importId: 'id',
            netImportId: 'identifier',
            netVersion: '1.0.0',
            netStringId: 'stringId',
        }]);
    }
}
