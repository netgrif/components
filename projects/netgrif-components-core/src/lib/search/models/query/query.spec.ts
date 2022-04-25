import {Query} from './query';
import {TestBed} from '@angular/core/testing';

describe('Query', () => {
    it('should create an instance', () => {
        expect(new Query('')).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
