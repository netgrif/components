import {WrappedBoolean} from './wrapped-boolean';
import {TestBed} from '@angular/core/testing';

describe('WrappedBoolean', () => {
    it('should create an instance', () => {
        expect(new WrappedBoolean()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
