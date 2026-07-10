import {UserValue} from './user-value';
import {TestBed} from '@angular/core/testing';

describe('UserValue', () => {
    it('should create an instance', () => {
        let user: UserValue;
        user = new UserValue('0', 'realmID0', 'name', 'surname', 'name surname','mail');
        expect(user.id).toEqual('0');
        expect(user.firstName).toEqual('name');
        expect(user.lastName).toEqual('surname');
        expect(user.fullName).toEqual('name surname');
        expect(user.username).toEqual('mail');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
