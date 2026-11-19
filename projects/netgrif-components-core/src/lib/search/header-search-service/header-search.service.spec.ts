import {TestBed} from '@angular/core/testing';
import {HeaderSearchService} from './header-search.service';
import {CategoryFactory} from '../category-factory/category-factory';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {TestCaseBaseFilterProvider, TestCaseViewAllowedNetsFactory} from '../../utility/tests/test-factory-methods';
import {MaterialModule} from '../../material/material.module';
import {SearchService} from '../search-service/search.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {NAE_BASE_FILTER} from '../models/base-filter-injection-token';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('HeaderSearchService', () => {
    let service: HeaderSearchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateLibModule,
                MaterialModule
            ],
            providers: [
                HeaderSearchService,
                CategoryFactory,
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(HeaderSearchService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
