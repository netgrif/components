import {FilterField} from './filter-field';
import {FilterType} from '../../../filter/models/filter-type';
import {TestBed} from '@angular/core/testing';

describe('FilterField', () => {
    it('should create an instance', () => {
        expect(new FilterField('', '', '', {
            filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []
        }, [], {}, '', '')).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
