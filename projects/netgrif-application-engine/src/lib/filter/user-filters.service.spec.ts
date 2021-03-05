import {TestBed} from '@angular/core/testing';
import {UserFiltersService} from './user-filters.service';

describe('UserFiltersService', () => {
    let service: UserFiltersService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UserFiltersService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
