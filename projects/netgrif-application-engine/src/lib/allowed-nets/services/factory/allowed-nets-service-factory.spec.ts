import {TestBed} from '@angular/core/testing';
import {AllowedNetsServiceFactory} from './allowed-nets-service-factory';

describe('AllowedNetsServiceFactory', () => {
    let service: AllowedNetsServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AllowedNetsServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
