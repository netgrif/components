import {Case} from '../../../resources/interface/case';

/**
 * Creates a mock Case instance with the given attributes.
 *
 * The attributes are filled with mostly empty values, if you want to make a test that uses some of them,
 * we recommend setting them yourself, as the returned object might change between versions.
 */
export function createMockCase(stringId = 'stringId',
                               processIdentifier = 'processIdentifier',
                               title = 'title',
                               petriNetId = 'petriNetId'): Case {
    return {
        lastModified: [],
        visualId: '',
        petriNetObjectId: {
            timestamp: 0,
            machineIdentifier: 0,
            processIdentifier: 0,
            counter: 0,
            timeSecond: 0,
            time: 0,
            date: 0
        },
        processIdentifier,
        title,
        color: '',
        creationDate: [],
        immediateData: [],
        author: {
            email: '',
            fullName: ''
        },
        resetArcTokens: {},
        stringId,
        petriNetId,
        permissions: {},
        users: {}
    };
}
