import {TestBed} from '@angular/core/testing';

import {WorkflowViewService} from './workflow-view.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('WorkflowsViewService', () => {
    let service: WorkflowViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                WorkflowViewService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
            ]
        });
        service = TestBed.inject(WorkflowViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
