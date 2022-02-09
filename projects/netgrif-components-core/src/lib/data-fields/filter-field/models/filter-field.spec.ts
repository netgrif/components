import {FilterField} from './filter-field';
import {FilterType} from '../../../filter/models/filter-type';

describe('FilterField', () => {
    it('should create an instance', () => {
        expect(new FilterField('', '', '', {
            filterType: FilterType.CASE, predicateMetadata: [], searchCategories: []
        }, [], {}, '', '')).toBeTruthy();
    });
});
