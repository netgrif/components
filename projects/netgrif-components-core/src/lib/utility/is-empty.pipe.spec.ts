import {expect} from '@ngbracket/ngx-layout/_private-utils/testing';
import {IsEmptyPipe} from './is-empty.pipe';

describe('IsEmptyPipe', () => {
    const pipe = new IsEmptyPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should check that value is empty', () => {
        expect(pipe.transform([])).toBeTruthy();
        expect(pipe.transform('')).toBeTruthy();
        expect(pipe.transform({})).toBeTruthy();
    });

    it('should check that value is not empty', () => {
        expect(pipe.transform(['not empty'])).toBeFalsy();
        expect(pipe.transform('not empty')).toBeFalsy();
        expect(pipe.transform({not: 'empty'})).toBeFalsy();
        expect(pipe.transform(25)).toBeFalsy();
    });
});
