import { TestBed } from '@angular/core/testing';
import { UserValue } from '../../user-field/models/user-value';
import { UserListValue } from './user-list-value';
import {expect} from "@angular/flex-layout/_private-utils/testing";

describe('UserListValue', () => {
    it('should create an instance', () => {
        let user: UserListValue;
        user = new UserListValue(new Map([['0', new UserValue('0', 'name', 'surname', 'mail')]]));
        expect(user.userValues.get('0').id).toEqual('0');
        expect(user.userValues.get('0').name).toEqual('name');
        expect(user.userValues.get('0').surname).toEqual('surname');
        expect(user.userValues.get('0').fullName).toEqual('name surname');
        expect(user.userValues.get('0').email).toEqual('mail');
    });

    it('should get last', () => {
        let user: UserListValue;
        user = new UserListValue(new Map([['0', new UserValue('0', 'name', 'surname', 'mail')]]));
        expect(user.getLast().id === '0').toBeTruthy();
    });

    it('should remove', () => {
        let user: UserListValue;
        user = new UserListValue(new Map([['0', new UserValue('0', 'name', 'surname', 'mail')]]));
        expect(user.userValues.size === 1).toBeTruthy();
        user.removeUserValue('0');
        expect(user.userValues.size === 0).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
