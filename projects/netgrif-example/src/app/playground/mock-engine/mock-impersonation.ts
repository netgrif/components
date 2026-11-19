import {MockNet, OTHER_USERS} from './mock-data';

/**
 * `impersonation_config` process of the engine (UserImpersonationConstants): a config lets its impersonators act as the
 * impersonated user with some of the roles / authorities. The user impersonate dialog lists the configs of the logged user
 * (the mock does not evaluate the query of the dialog, every config is valid for the playground user).
 */
export const IMPERSONATION_NET: MockNet = {
    stringId: 'net-impersonation',
    identifier: 'impersonation_config',
    title: 'Impersonation config',
    initials: 'IMP',
    defaultCaseName: 'Impersonation',
    icon: 'supervisor_account',
    immediate: ['impersonated', 'impersonated_roles', 'impersonated_authorities'],
    fields: [
        {id: 'impersonated', type: 'user', name: 'Impersonated user'},
        {id: 'impersonated_roles', type: 'multichoice_map', name: 'Roles', value: [],
            options: {clerk: 'Claims clerk', manager: 'Regional manager responsible for the approval of claims above the limit of the branch office'}},
        {id: 'impersonated_authorities', type: 'multichoice_map', name: 'Authorities', value: [],
            options: {ROLE_USER: 'User', ROLE_ADMIN: 'Administrator'}},
    ],
    transitions: [],
    initialTransitions: [],
    flow: {},
};

const user = (u: typeof OTHER_USERS[number]) => ({id: u.id, email: u.email, name: u.name, surname: u.surname, fullName: u.fullName});

/** configs of the playground user: one per impersonated user, one with long names */
export const IMPERSONATION_CASES = [
    {id: 'impersonation-john', net: IMPERSONATION_NET.stringId, title: 'Substitute for John Smith',
        values: {impersonated: user(OTHER_USERS[0]), impersonated_roles: ['clerk'], impersonated_authorities: ['ROLE_USER']}, finished: []},
    {id: 'impersonation-eva', net: IMPERSONATION_NET.stringId, title: 'Holiday cover for Eva Novak',
        values: {impersonated: user(OTHER_USERS[1]), impersonated_roles: ['clerk', 'manager'], impersonated_authorities: ['ROLE_USER']}, finished: []},
    {id: 'impersonation-long', net: IMPERSONATION_NET.stringId, title: `Assessment of the large claims of ${OTHER_USERS[2].fullName}`,
        values: {impersonated: user(OTHER_USERS[2]), impersonated_roles: ['manager'], impersonated_authorities: ['ROLE_USER', 'ROLE_ADMIN']},
        finished: []},
];
