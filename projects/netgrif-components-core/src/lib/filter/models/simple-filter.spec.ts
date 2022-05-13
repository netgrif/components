import {SimpleFilter} from './simple-filter';
import {FilterType} from './filter-type';
import {TestBed} from '@angular/core/testing';

describe('SimpleFilter', () => {
    it('should create an instance', () => {
        expect(new SimpleFilter('', FilterType.TASK, {})).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
