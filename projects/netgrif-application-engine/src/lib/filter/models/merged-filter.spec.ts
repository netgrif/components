import {MergedFilter} from './merged-filter';
import {FilterType} from './filter-type';
import {MergeOperator} from './merge-operator';

describe('MergedFilter', () => {
    it('should create an instance', () => {
        expect(new MergedFilter('', FilterType.TASK, [{}], MergeOperator.AND)).toBeTruthy();
    });
});
