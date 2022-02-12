import {ImmediateData} from '../../../resources/interface/immediate-data';

/**
 * Creates a mock ImmediateData instance with the given attributes.
 *
 * The attributes are filled with mostly empty values, if you want to make a test that uses some of them,
 * we recommend setting them yourself, as the returned object might change between versions.
 */
export function createMockImmediateData(importId = 'importId', value: any = '', allowedNets?: Array<string>): ImmediateData {
    return {
        stringId: importId,
        type: '',
        value,
        allowedNets
    };
}
