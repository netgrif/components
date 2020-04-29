import {FilteredArray} from './filtered-array';

describe('FilteredArray', () => {
    it('should create an instance', () => {
        expect(new FilteredArray([], () => true)).toBeTruthy();
        new FilteredArray([], () => true).filter([]);
    });
});
