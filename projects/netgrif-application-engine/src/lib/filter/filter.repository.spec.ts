import {TestBed} from '@angular/core/testing';

import {FilterRepository} from './filter.repository';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';

describe('FilterRepository', () => {
    let service: FilterRepository;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(FilterRepository);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

