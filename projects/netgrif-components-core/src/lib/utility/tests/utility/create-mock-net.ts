import {Net} from '../../../process/net';
import NetRole from '../../../process/netRole';
import {ImmediateData} from '../../../resources/interface/immediate-data';
import {Permissions} from '../../../process/permissions';

/**
 * A mock transition representation used by the {@link createMockNet} function to populate the mock net with mock transition objects
 */
export interface MockTransition {
    stringId: string;
    title: string;
}

/**
 * Creates a mock Net instance with the given attributes.
 *
 * The attributes are filled with mostly empty values, if you want to make a test that uses some of them,
 * we recommend setting them yourself, as the returned object might change between versions.
 */
export function createMockNet(stringId = 'stringId',
                              identifier = 'identifier',
                              title = 'title',
                              roles: Array<NetRole> = [],
                              transitions: Array<MockTransition> = [],
                              immediateData: Array<ImmediateData> = [],
                              permissions: Permissions = {}): Net {
    const net = new Net({
        stringId,
        title,
        identifier,
        uriNodeId: identifier,
        version: '1.0.0',
        initials: 'NET',
        defaultCaseName: '',
        createdDate: [2021, 2, 4, 12, 50, 0, 1612443000],
        author: {
            email: '',
            fullName: ''
        },
        immediateData
    });
    net.roles = roles;
    net.transitions = transitions.map(t => ({
        ...t,
        petriNetId: '',
        immediateData: []
    }));
    net.permissions = permissions;
    return net;
}
