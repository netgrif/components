import {InRangeDateTime} from './in-range-date-time';
import {TestBed} from '@angular/core/testing';

describe('InRangeDateTime', () => {
    it('should create an instance', () => {
        expect(new InRangeDateTime()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
