import {expect} from '@angular/flex-layout/_private-utils/testing';
import {IsNonEmptyPipe} from './is-non-empty.pipe';

describe('IsNonEmptyPipe', () => {
    const pipe = new IsNonEmptyPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should check that value is empty', () => {
        expect(pipe.transform([])).toBeFalsy();
        expect(pipe.transform('')).toBeFalsy();
        expect(pipe.transform({})).toBeFalsy();
        expect(pipe.transform(null)).toBeFalsy();
        expect(pipe.transform(undefined)).toBeFalsy();
    });

    it('should check that value is not empty', () => {
        expect(pipe.transform(['not empty'])).toBeTruthy();
        expect(pipe.transform('not empty')).toBeTruthy();
        expect(pipe.transform({not: 'empty'})).toBeTruthy();
        expect(pipe.transform(25)).toBeTruthy();
    });
});
