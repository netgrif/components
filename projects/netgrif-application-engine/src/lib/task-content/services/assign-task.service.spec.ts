import {TestBed} from '@angular/core/testing';
import {AssignTaskService} from './assign-task.service';

describe('AssignTaskService', () => {
    let service: AssignTaskService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AssignTaskService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
