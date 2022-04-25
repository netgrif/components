import {AfterAction} from './after-action';
import {TestBed} from '@angular/core/testing';

describe('AfterAction', () => {
    it('should create an instance', () => {
        expect(new AfterAction()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
