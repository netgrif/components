import {TestBed} from '@angular/core/testing';
import {FinishPolicyService} from './finish-policy.service';

describe('FinishPolicyService', () => {
    let service: FinishPolicyService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FinishPolicyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
