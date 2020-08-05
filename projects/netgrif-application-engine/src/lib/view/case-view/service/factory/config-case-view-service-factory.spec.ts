import {TestBed} from '@angular/core/testing';
import {ConfigCaseViewServiceFactory} from './config-case-view-service-factory';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {MaterialModule} from '../../../../material/material.module';
import {SearchService} from '../../../../search/search-service/search.service';
import {SimpleFilter} from '../../../../filter/models/simple-filter';
import {FilterType} from '../../../../filter/models/filter-type';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


describe('ConfigCaseViewServiceFactoryService', () => {
    let service: ConfigCaseViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule, TranslateLibModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: SearchService, useFactory: () => new SearchService(SimpleFilter.empty(FilterType.CASE))},
                ConfigCaseViewServiceFactory,
                {provide: ConfigurationService, useClass: TestConfigurationService},
            ]
        });
        service = TestBed.inject(ConfigCaseViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
