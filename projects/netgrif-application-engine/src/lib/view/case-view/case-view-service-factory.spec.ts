import {TestBed} from '@angular/core/testing';
import {CaseViewServiceFactory} from './case-view-service-factory';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MaterialModule} from '../../material/material.module';
import {SearchService} from '../../search/search-service/search.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';


describe('CaseViewServiceFactoryService', () => {
    let service: CaseViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MaterialModule
            ],
            providers: [
                {provide: SearchService, useFactory: () => new SearchService(SimpleFilter.empty(FilterType.CASE))},
                CaseViewServiceFactory,
                {provide: ConfigurationService, useClass: TestConfigurationService},
            ]
        });
        service = TestBed.inject(CaseViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
