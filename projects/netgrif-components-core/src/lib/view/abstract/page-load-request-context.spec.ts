import {PageLoadRequestContext} from './page-load-request-context';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {TestBed} from '@angular/core/testing';

describe('PageLoadRequestContext', () => {
    it('should create an instance', () => {
        expect(new PageLoadRequestContext(SimpleFilter.emptyTaskFilter(),
            {size: 1, totalElements: 1, totalPages: 1, number: 0})).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
