import {UserField} from './user-field';
import {TestBed} from '@angular/core/testing';

describe('UserField', () => {
    it('should create an instance', () => {
        expect(new UserField('', '', {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        }, undefined, [])).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
