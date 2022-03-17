import {Inject, Injectable} from '@angular/core';
import {NAE_SEARCH_CATEGORIES} from './search-categories-injection-token';
import {inject, TestBed} from '@angular/core/testing';
import {defaultCaseSearchCategoriesFactory, defaultTaskSearchCategoriesFactory} from './default-categories-factories';
import {CategoryFactory} from './category-factory';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ConfigurationService} from '../../configuration/configuration.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {
    TestCaseBaseFilterProvider,
    TestCaseViewAllowedNetsFactory,
    TestTaskBaseFilterProvider,
    TestTaskViewAllowedNetsFactory
} from '../../utility/tests/test-factory-methods';
import {MaterialModule} from '../../material/material.module';
import {SearchService} from '../search-service/search.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('Default search categories factory methods', () => {
    let testService: TestService;

    describe('default case categories', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule,
                    MaterialModule,
                    TranslateLibModule,
                    NoopAnimationsModule
                ],
                providers: [
                    TestService,
                    CategoryFactory,
                    {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
                    {provide: ConfigurationService, useClass: TestConfigurationService},
                    SearchService,
                    {
                        provide: NAE_BASE_FILTER,
                        useFactory: TestCaseBaseFilterProvider
                    },
                    {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                    {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
                ]
            });
            testService = TestBed.inject(TestService);
        });

        it('should create default case search categories', () => {
            expect(testService).toBeTruthy();
            expect(testService.searchCategories).toBeTruthy();
            expect(Array.isArray(testService.searchCategories)).toBeTrue();
            expect(testService.searchCategories.length).toBe(9);
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
                    TranslateLibModule,
                    HttpClientTestingModule
                ],
                providers: [
                    TestService,
                    CategoryFactory,
                    SearchService,
                    {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultTaskSearchCategoriesFactory, deps: [CategoryFactory]},
                    {provide: ConfigurationService, useClass: TestConfigurationService},
                    {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                    {provide: NAE_BASE_FILTER, useFactory: TestTaskBaseFilterProvider},
                    {provide: AllowedNetsService, useFactory: TestTaskViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
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
