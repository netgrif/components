import {TestBed} from '@angular/core/testing';

import {WorkflowHeaderService} from './workflow-header.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WorkflowHeaderService', () => {
    let service: WorkflowHeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ TranslateLibModule, HttpClientTestingModule],
            providers: [WorkflowHeaderService]
        });
        service = TestBed.inject(WorkflowHeaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
