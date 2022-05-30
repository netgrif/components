import {IsNull} from './is-null';
import {TestBed} from '@angular/core/testing';

describe('IsNull', () => {
    it('should create an instance', () => {
        expect(new IsNull()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
