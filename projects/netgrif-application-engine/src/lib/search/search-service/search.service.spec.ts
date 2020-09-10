import {TestBed} from '@angular/core/testing';
import {SearchService} from './search.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchService', () => {
    let service: SearchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            providers: [
                {provide: SearchService, useValue: new SearchService(SimpleFilter.empty(FilterType.CASE))}
            ]
        });
        service = TestBed.inject(SearchService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
