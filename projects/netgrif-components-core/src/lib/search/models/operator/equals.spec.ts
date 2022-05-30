import {Equals} from './equals';
import {TestBed} from '@angular/core/testing';

describe('Equals', () => {
    it('should create an instance', () => {
        expect(new Equals()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
