import {userInitials} from './user-initials';

describe('userInitials', () => {
    it('uses the name and the surname', () => {
        expect(userInitials({name: 'ada', surname: 'Admin', fullName: 'Something else'})).toBe('AA');
        expect(userInitials({firstName: 'Ján', lastName: 'Novák'})).toBe('JN');
    });

    it('falls back to the full name and the e-mail', () => {
        expect(userInitials({fullName: '  Mary  Ann Smith '})).toBe('MA');
        expect(userInitials({email: 'super@netgrif.com'})).toBe('S');
        expect(userInitials(undefined)).toBe('');
    });
});
