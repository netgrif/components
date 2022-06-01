import {LessThan} from './less-than';
import {TestBed} from '@angular/core/testing';

describe('LessThan', () => {
    it('should create an instance', () => {
        expect(new LessThan()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
