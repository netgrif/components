import {TestBed} from '@angular/core/testing';
import {AssignPolicyService} from './assign-policy.service';

describe('AssignPolicyService', () => {
    let service: AssignPolicyService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AssignPolicyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
