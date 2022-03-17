import {InRange} from './in-range';
import {TestBed} from '@angular/core/testing';

describe('InRange', () => {
    it('should create an instance', () => {
        expect(new InRange()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
