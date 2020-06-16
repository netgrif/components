import {TestBed} from '@angular/core/testing';
import {TaskRequestStateService} from './task-request-state.service';

describe('TaskRequestStateService', () => {
    let service: TaskRequestStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TaskRequestStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
