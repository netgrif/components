import {TestBed} from '@angular/core/testing';
import {SingleTaskContentService} from './single-task-content.service';

describe('SingleTaskContentService', () => {
    let service: SingleTaskContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SingleTaskContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
