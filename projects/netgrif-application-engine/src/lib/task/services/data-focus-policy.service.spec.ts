import {TestBed} from '@angular/core/testing';
import {DataFocusPolicyService} from './data-focus-policy.service';

describe('DataFocusPolicyService', () => {
    let service: DataFocusPolicyService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DataFocusPolicyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
