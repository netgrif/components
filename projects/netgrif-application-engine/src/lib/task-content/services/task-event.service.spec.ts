import {TestBed} from '@angular/core/testing';
import {TaskEventService} from './task-event.service';

describe('TaskEventService', () => {
    let service: TaskEventService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskEventService]
        });
        service = TestBed.inject(TaskEventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
