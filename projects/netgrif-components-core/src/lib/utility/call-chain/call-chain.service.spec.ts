import {TestBed} from '@angular/core/testing';
import {CallChainService} from './call-chain.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('CallChainService', () => {
    let service: CallChainService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule]
        });
        service = TestBed.inject(CallChainService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
