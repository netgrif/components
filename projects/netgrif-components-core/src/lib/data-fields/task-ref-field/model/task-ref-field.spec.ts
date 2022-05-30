import {TaskRefField} from './task-ref-field';
import {TestBed} from '@angular/core/testing';

describe('TaskRefField', () => {
    it('should create an instance', () => {
        expect(new TaskRefField('', '', [''], {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        })).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
