import {TestBed} from '@angular/core/testing';
import {FinishTaskService} from './finish-task.service';

describe('FinishTaskService', () => {
    let service: FinishTaskService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FinishTaskService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
