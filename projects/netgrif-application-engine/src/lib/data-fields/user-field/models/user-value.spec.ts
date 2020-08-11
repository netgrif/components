import {UserValue} from './user-value';

describe('UserValue', () => {
    it('should create an instance', () => {
        let user: UserValue;
        user = new UserValue('0', 'name', 'surname', 'mail');
        expect(user.id).toEqual('0');
        expect(user.name).toEqual('name');
        expect(user.surname).toEqual('surname');
        expect(user.fullName).toEqual('name surname');
        expect(user.email).toEqual('mail');
    });
});
