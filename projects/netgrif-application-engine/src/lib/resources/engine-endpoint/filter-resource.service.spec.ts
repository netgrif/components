import {TestBed} from '@angular/core/testing';
import {FilterResourceService} from './filter-resource.service';

describe('FilterResourceService', () => {
    let service: FilterResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FilterResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
