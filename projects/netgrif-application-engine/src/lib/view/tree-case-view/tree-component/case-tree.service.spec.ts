import {TestBed} from '@angular/core/testing';
import {CaseTreeService} from './case-tree.service';

describe('CaseTreeService', () => {
    let service: CaseTreeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CaseTreeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
