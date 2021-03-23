import {Inject, Injectable} from '@angular/core';
import {NAE_SEARCH_CATEGORIES} from './search-categories-injection-token';
import {TestBed} from '@angular/core/testing';
import {defaultCaseSearchCategoriesFactory, defaultTaskSearchCategoriesFactory} from './default-categories-factories';
import {CategoryFactory} from './category-factory';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ConfigurationService} from '../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    TestCaseBaseFilterProvider,
    TestCaseViewFactory,
    TestTaskBaseFilterProvider,
    TestTaskViewFactory
} from '../../utility/tests/test-factory-methods';
import {CaseViewService} from '../../view/case-view/service/case-view-service';
import {MaterialModule} from '../../material/material.module';
import {SearchService} from '../search-service/search.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {CaseViewServiceFactory} from '../../view/case-view/service/factory/case-view-service-factory';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {TaskViewServiceFactory} from '../../view/task-view/service/factory/task-view-service-factory';

describe('Default search categories factory methods', () => {
    let testService: TestService;

    describe('default case categories', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    MaterialModule,
                    TranslateLibModule,
                ],
                providers: [
                    TestService,
                    CategoryFactory,
                    CaseViewServiceFactory,
                    {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
                    {provide: ConfigurationService, useClass: TestConfigurationService},
                    {provide: CaseViewService, useFactory: TestCaseViewFactory, deps: [CaseViewServiceFactory]},
                    SearchService,
                    {
                        provide: NAE_BASE_FILTER,
                        useFactory: TestCaseBaseFilterProvider
                    },
                    {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService}
                ]
            });
            testService = TestBed.inject(TestService);
        });

        it('should create default case search categories', () => {
            expect(testService).toBeTruthy();
            expect(testService.searchCategories).toBeTruthy();
            expect(Array.isArray(testService.searchCategories)).toBeTrue();
            expect(testService.searchCategories.length).toBe(7);
            for (const category of testService.searchCategories) {
                expect(category).toBeTruthy();
            }
        });

        afterEach(() => {
            TestBed.resetTestingModule();
        });
    });

    describe('default task categories', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    MaterialModule,
                    TranslateLibModule
                ],
                providers: [
                    TestService,
                    CategoryFactory,
                    TaskViewServiceFactory,
                    SearchService,
                    {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
                    {provide: ConfigurationService, useClass: TestConfigurationService},
                    {provide: TaskViewService, useFactory: TestTaskViewFactory, deps: [TaskViewServiceFactory]},
                    {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                    {provide: NAE_BASE_FILTER, useFactory: TestTaskBaseFilterProvider},
                ]
            });
            testService = TestBed.inject(TestService);
        });

        it('should create default task search categories', () => {
            expect(testService).toBeTruthy();
            expect(testService.searchCategories).toBeTruthy();
            expect(Array.isArray(testService.searchCategories)).toBeTrue();
            expect(testService.searchCategories.length).toBe(4);
            for (const category of testService.searchCategories) {
                expect(category).toBeTruthy();
            }
        });

        afterEach(() => {
            TestBed.resetTestingModule();
        });
    });

});

@Injectable()
class TestService {

    constructor(@Inject(NAE_SEARCH_CATEGORIES) public searchCategories) {
    }
}
