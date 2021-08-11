import {TestBed} from '@angular/core/testing';
import {UserFiltersService} from './user-filters.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../configuration/configuration.service';
import {TestConfigurationService} from '../utility/tests/test-config';

describe('UserFiltersService', () => {
    let service: UserFiltersService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(UserFiltersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
