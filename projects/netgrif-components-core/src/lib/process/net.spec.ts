import {Net} from './net';
import {TestBed} from '@angular/core/testing';

describe('Net', () => {
    it('should create an instance', () => {
        expect(new Net({
            stringId: 'true',
            title: 'string',
            identifier: 'string',
            version: 'string',
            initials: 'string',
            defaultCaseName: 'string',
            createdDate: [2020, 1, 1, 1, 1],
            author: {email: 'mail', fullName: 'name'},
            immediateData: [],
        })).toBeTruthy();
    });

    it('should test getters', () => {
        const net = new Net({
            stringId: 'true',
            title: 'string',
            identifier: 'string',
            version: 'string',
            initials: 'string',
            defaultCaseName: 'string',
            createdDate: [2020, 1, 1, 1, 1],
            author: {email: 'mail', fullName: 'name'},
            immediateData: [],
        });
        expect(net.stringId).toEqual('true');
        expect(net.title).toEqual('string');
        expect(net.identifier).toEqual('string');
        expect(net.version).toEqual('string');
        expect(net.initials).toEqual('string');
        expect(net.defaultCaseName).toEqual('string');
        expect(net.createdDate).toEqual([2020, 1, 1, 1, 1]);
        expect(net.author).toEqual({email: 'mail', fullName: 'name'});
        expect(net.immediateData).toEqual([]);
        expect(net.transitions).toEqual([]);
        expect(net.transactions).toEqual([]);
        expect(net.roles).toEqual([]);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
