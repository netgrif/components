import { UserListField } from './user-list-field';
import { TestBed } from '@angular/core/testing';
import { UserValue } from '../../user-field/models/user-value';
import { UserListValue } from './user-list-value';

describe('UserListValue', () => {
    it('should create an instance', () => {
        let user: UserListValue;
        user = new UserListValue([new UserValue('0', 'name', 'surname', 'mail')]);
        expect(user.userValues[0].id).toEqual('0');
        expect(user.userValues[0].name).toEqual('name');
        expect(user.userValues[0].surname).toEqual('surname');
        expect(user.userValues[0].fullName).toEqual('name surname');
        expect(user.userValues[0].email).toEqual('mail');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
