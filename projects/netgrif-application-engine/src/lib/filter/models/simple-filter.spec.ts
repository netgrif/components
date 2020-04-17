import {SimpleFilter} from './simple-filter';
import {FilterType} from './filter-type';

describe('SimpleFilter', () => {
    it('should create an instance', () => {
        expect(new SimpleFilter('', FilterType.TASK, {})).toBeTruthy();
    });
});
