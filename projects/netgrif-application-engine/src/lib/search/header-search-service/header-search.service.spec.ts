import {TestBed} from '@angular/core/testing';
import {HeaderSearchService} from './header-search.service';
import {CategoryFactory} from '../category-factory/category-factory';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {CaseViewService} from '../../view/case-view/service/case-view-service';
import {TestCaseSearchServiceFactory, TestCaseViewFactory} from '../../utility/tests/test-factory-methods';
import {ConfigCaseViewServiceFactory} from '../../view/case-view/service/factory/config-case-view-service-factory';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material/material.module';
import {SearchService} from '../search-service/search.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';

describe('HeaderSearchService', () => {
    let service: HeaderSearchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TranslateLibModule,
                MaterialModule,
                NoopAnimationsModule
            ],
            providers: [
                HeaderSearchService,
                CategoryFactory,
                ConfigCaseViewServiceFactory,
                {provide: SearchService, useFactory: TestCaseSearchServiceFactory},
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: CaseViewService, useFactory: TestCaseViewFactory, deps: [ConfigCaseViewServiceFactory]}
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
