import {Net} from '../../../process/net';

/**
 * Creates a mock Net instance with the given attributes.
 *
 * The attributes are filled with mostly empty values, if you want to make a test that uses some of them,
 * we recommend setting them yourself, as the returned object might change between versions.
 */
export function createMockNet(stringId: string = 'stringId',
                              identifier: string = 'identifier',
                              title: string = 'title'): Net {
    return new Net({
        stringId,
        title,
        identifier,
        version: '1.0.0',
        initials: 'NET',
        defaultCaseName: '',
        createdDate: [2021, 2, 4, 12, 50, 0, 1612443000],
        author: {
            email: '',
            fullName: ''
        },
        immediateData: [],
        staticImmediateData: []
    });
}
