import { TestBed } from '@angular/core/testing';
import { UserListField } from './user-list-field';

describe('UserListField', () => {
    it('should create an instance', () => {
        expect(new UserListField('', '', {
            required: true,
            optional: true,
            visible: true,
            editable: true,
            hidden: true
        }, undefined)).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
