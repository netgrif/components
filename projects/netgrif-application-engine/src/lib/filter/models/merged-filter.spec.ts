import {MergedFilter} from './merged-filter';
import {FilterType} from './filter-type';
import {MergeOperator} from './merge-operator';

describe('MergedFilter', () => {
    it('should create an instance', () => {
        expect(new MergedFilter('', FilterType.TASK, [{}], MergeOperator.AND)).toBeTruthy();
    });

    it('should clone a filter instance', () => {
        expect(new MergedFilter('', FilterType.TASK, [{}], MergeOperator.AND).clone())
            .toEqual(new MergedFilter('', FilterType.TASK, [{}], MergeOperator.AND));
    });

    it('should merge a filter instance', () => {
        const filter = new MergedFilter('', FilterType.TASK, [{}], MergeOperator.AND);
        expect(filter.merge(new MergedFilter('', FilterType.TASK, [{}], MergeOperator.AND), MergeOperator.AND))
            .toEqual(new MergedFilter('&', FilterType.TASK, [{}, {}], MergeOperator.AND));

        expect(filter.getRequestParams()).toEqual({operation: MergeOperator.AND});
    });
});
