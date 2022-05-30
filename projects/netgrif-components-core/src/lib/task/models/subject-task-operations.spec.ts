import {SubjectTaskOperations} from './subject-task-operations';
import {TestBed} from '@angular/core/testing';

describe('SubjectTaskOperations', () => {
    it('should create an instance', () => {
        expect(new SubjectTaskOperations()).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
