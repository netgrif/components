import {changeType} from './resource-utility-functions';

describe('changeType', () => {
    it('should test changeType function', () => {
        expect(changeType({ _embedded: []}, undefined)).toEqual([]);
        expect(changeType({ _embedded: {fields: []}}, 'fields')).toEqual([]);
        expect(changeType({ _embedded: []}, 'fields')).toEqual([]);
        expect(changeType({ }, undefined)).toEqual({});
    });
});
