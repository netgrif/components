import {Net} from '../../../process/net';
import {ImmediateData} from '../../../resources/interface/immediate-data';
import {PermissionsWrapper} from '../../../process/permissions';

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
                              transitions: Array<MockTransition> = [],
                              immediateData: Array<ImmediateData> = [],
                              permissions: PermissionsWrapper = { permissions: {}}): Net {
    const net = new Net({
        stringId,
        title,
        identifier,
        uriNodeId: identifier,
        version: '1.0.0',
        initials: 'NET',
        defaultCaseName: '',
        createdDate: [2021, 2, 4, 12, 50, 0, 1612443000],
        authorId: '',
        immediateData,
        processRolePermissions: { permissions: {}}
    });
    net.transitions = transitions.map(t => ({
        ...t,
        petriNetId: '',
        immediateData: []
    }));
    net.processRolePermissions = permissions;
    return net;
}
