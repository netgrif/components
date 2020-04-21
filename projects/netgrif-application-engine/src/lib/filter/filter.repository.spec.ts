import {TestBed} from '@angular/core/testing';

import {FilterRepository} from './filter.repository';
import {ConfigurationService} from '../configuration/configuration.service';

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

class TestConfigurationService extends ConfigurationService {
    constructor() {
        super({assets: [], providers: undefined, theme: undefined, views: undefined});
    }
}
