import {TestBed} from '@angular/core/testing';
import {AllowedNetsService} from './allowed-nets.service';

describe('AllowedNetsService', () => {
    let service: AllowedNetsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AllowedNetsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
