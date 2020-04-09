import {TestBed} from '@angular/core/testing';

import {WorkflowHeaderService} from './workflow-header.service';

describe('WorkflowHeaderService', () => {
    let service: WorkflowHeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WorkflowHeaderService]
        });
        service = TestBed.inject(WorkflowHeaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
