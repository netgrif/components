import {TestBed} from '@angular/core/testing';

import {PublicCaseResourceService} from './public-case-resource.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';

describe('PublicCaseResourceService', () => {
    let service: PublicCaseResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        });
        service = TestBed.inject(PublicCaseResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach( () => {
        TestBed.resetTestingModule();
    });
});
