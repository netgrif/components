import {Like} from './like';
import {TestBed} from '@angular/core/testing';

describe('Like', () => {
    it('should create an instance', () => {
        expect(new Like()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
