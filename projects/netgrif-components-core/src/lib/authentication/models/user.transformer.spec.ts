import {UserTransformer} from './user.transformer';
import {TestBed} from '@angular/core/testing';

describe('UserTransformer', () => {
    it('should create an instance', () => {
        expect(new UserTransformer()).toBeTruthy();
    });

    it('should transform user', () => {
        const userTransformer = new UserTransformer();
        expect(userTransformer.transform({
            id: 'string',
            email: 'string',
            name: 'string',
            surname: 'string',
            fullName: 'string string',
            groups: [],
            authorities: [{authority: 'ADMIN'}],
            processRoles: [{stringId: 'string', description: 'desc', name: 'name', importId: 'importId'}],
            nextGroups: [],
            _links: {}
        }).fullName).toEqual('string string');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
