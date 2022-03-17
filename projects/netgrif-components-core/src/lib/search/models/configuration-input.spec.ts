import {ConfigurationInput} from './configuration-input';
import {SearchInputType} from './category/search-input-type';
import {TestBed} from '@angular/core/testing';

describe('ConfigurationInput', () => {
    it('should create an instance', () => {
        expect(new ConfigurationInput(SearchInputType.AUTOCOMPLETE, '', false, new Map<string, Array<unknown>>(), () => [])).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
