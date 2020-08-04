import {TestBed} from '@angular/core/testing';
import {TaskRequestStateService} from './task-request-state.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TaskRequestStateService', () => {
    let service: TaskRequestStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            providers: [TaskRequestStateService]
        });
        service = TestBed.inject(TaskRequestStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
