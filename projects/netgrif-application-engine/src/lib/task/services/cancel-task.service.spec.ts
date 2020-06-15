import {TestBed} from '@angular/core/testing';
import {CancelTaskService} from './cancel-task.service';

describe('CancelTaskService', () => {
    let service: CancelTaskService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CancelTaskService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
