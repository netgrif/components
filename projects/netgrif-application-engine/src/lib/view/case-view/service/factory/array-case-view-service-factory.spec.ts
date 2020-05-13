import {TestBed} from '@angular/core/testing';
import {ArrayCaseViewServiceFactory} from './array-case-view-service-factory';

describe('ArrayCaseViewServiceFactory', () => {
    let service: ArrayCaseViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ArrayCaseViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
