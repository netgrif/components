import {IdentityTransformer} from './identity.transformer';
import {TestBed} from '@angular/core/testing';

describe('IdentityTransformer', () => {
    it('should create an instance', () => {
        expect(new IdentityTransformer()).toBeTruthy();
    });

    it('should transform identity', () => {
        const userTransformer = new IdentityTransformer();
        expect(userTransformer.transform({
            id: 'string',
            username: 'string',
            firstname: 'string',
            lastname: 'string',
            activeActorId: 'string',
            fullName: 'string string',
            _links: {}
        }).fullName).toEqual('string string');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
