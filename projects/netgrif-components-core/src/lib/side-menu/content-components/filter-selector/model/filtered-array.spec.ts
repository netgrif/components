import {FilteredArray} from './filtered-array';
import {TestBed} from '@angular/core/testing';

describe('FilteredArray', () => {
    it('should create an instance', () => {
        expect(new FilteredArray([], () => true)).toBeTruthy();
        new FilteredArray([], () => true).filter([]);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
