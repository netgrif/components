import {TestBed} from '@angular/core/testing';
import {FieldListService} from './field-list.service';

describe('FieldListService', () => {
    let service: FieldListService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [FieldListService]});
        service = TestBed.inject(FieldListService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
