import {NullTaskOperations} from './null-task-operations';
import {TestBed} from '@angular/core/testing';

describe('NullTaskOperations', () => {
    it('should create an instance', () => {
        expect(new NullTaskOperations()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
