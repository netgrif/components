import { CaseViewServiceFactory } from './case-view-service-factory';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../../material/material.module';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SearchService} from '../../../../search/search-service/search.service';
import {SimpleFilter} from '../../../../filter/models/simple-filter';
import {FilterType} from '../../../../filter/models/filter-type';
import {AuthenticationMethodService} from '../../../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../../../utility/tests/mocks/mock-authentication-method-service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {NAE_BASE_FILTER} from '../../../../search/models/base-filter-injection-token';
import {TestCaseBaseFilterProvider} from '../../../../utility/tests/test-factory-methods';

describe('CaseViewServiceFactory', () => {
    let service: CaseViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule, TranslateLibModule,
                NoopAnimationsModule
            ],
            providers: [
                SearchService,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                CaseViewServiceFactory,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
            ]
        });
        service = TestBed.inject(CaseViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
