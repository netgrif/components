import {TestBed} from '@angular/core/testing';
import {CaseViewService} from './case-view-service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('CaseViewService', () => {
    let service: CaseViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MaterialModule],
            providers: [
                CaseViewService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
                ]
        });
        service = TestBed.inject(CaseViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
