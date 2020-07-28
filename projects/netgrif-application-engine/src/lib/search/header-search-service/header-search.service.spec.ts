import {TestBed} from '@angular/core/testing';
import {HeaderSearchService} from './header-search.service';

describe('HeaderSearchService', () => {
    let service: HeaderSearchService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HeaderSearchService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
