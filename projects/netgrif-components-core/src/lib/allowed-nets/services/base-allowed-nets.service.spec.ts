import {TestBed} from '@angular/core/testing';
import {BaseAllowedNetsService} from './base-allowed-nets.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('BaseAllowedNetsService', () => {
    let service: BaseAllowedNetsService;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [NoopAnimationsModule]});
        service = TestBed.inject(BaseAllowedNetsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
