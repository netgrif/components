import {TestBed} from '@angular/core/testing';

import {PublicTaskResourceService} from './public-task-resource.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';

describe('PublicTaskResourceService', () => {
    let service: PublicTaskResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
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
