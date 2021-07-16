import {TestBed} from '@angular/core/testing';
import {BaseAllowedNetsService} from './base-allowed-nets.service';

describe('BaseAllowedNetsService', () => {
    let service: BaseAllowedNetsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BaseAllowedNetsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
