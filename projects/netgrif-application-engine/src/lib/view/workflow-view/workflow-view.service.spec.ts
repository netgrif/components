import {TestBed} from '@angular/core/testing';

import {WorkflowViewService} from './workflow-view.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('WorkflowsViewService', () => {
    let service: WorkflowViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,
                NoopAnimationsModule],
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
