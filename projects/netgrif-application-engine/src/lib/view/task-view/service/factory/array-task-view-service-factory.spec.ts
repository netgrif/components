import {TestBed} from '@angular/core/testing';
import {ArrayTaskViewServiceFactory} from './array-task-view-service-factory';

describe('ArrayTaskViewServiceFactory', () => {
    let service: ArrayTaskViewServiceFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ArrayTaskViewServiceFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
