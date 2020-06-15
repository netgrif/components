import {TestBed} from '@angular/core/testing';
import {DelegateTaskService} from './delegate-task.service';

describe('DelegateTaskService', () => {
    let service: DelegateTaskService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DelegateTaskService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
