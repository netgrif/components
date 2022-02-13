import {TestBed} from '@angular/core/testing';
import {CallChainService} from './call-chain.service';

describe('CallChainService', () => {
    let service: CallChainService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CallChainService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
