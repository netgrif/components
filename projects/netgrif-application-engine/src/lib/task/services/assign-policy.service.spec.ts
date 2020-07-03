import {TestBed} from '@angular/core/testing';
import {AssignPolicyService} from './assign-policy.service';
import {TaskDataService} from './task-data.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AssignPolicyService', () => {
    let service: AssignPolicyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            providers: [AssignPolicyService, TaskDataService]
        });
        service = TestBed.inject(AssignPolicyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
