import {TestBed} from '@angular/core/testing';

import {PublicTaskResourceService} from './public-task-resource.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('PublicTaskResourceService', () => {
    let service: PublicTaskResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(PublicTaskResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
