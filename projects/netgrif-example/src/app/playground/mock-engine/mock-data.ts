/**
 * Hand written data of the playground mock engine, in the format of the Netgrif Application Engine REST API.
 *
 * Two processes (insurance claim, leave request) with a few cases. Every transition has a task form,
 * the field values are kept per case, so a value set in one task is shown in the other tasks of the case.
 * Recorded engine responses can replace any of it, see `RecordedResponses` in mock-engine.service.ts.
 */

/** Process role of the playground user, it has every permission in both processes. */
export const PLAYGROUND_ROLE = 'playground_role';

export const PLAYGROUND_USER = {
    id: 'playground-user',
    email: 'jane.doe@netgrif.com',
    name: 'Jane',
    surname: 'Doe',
    fullName: 'Jane Doe',
    groups: [],
    authorities: [{authority: 'ROLE_USER'}, {authority: 'ROLE_ADMIN'}],
    nextGroups: [],
    processRoles: [{stringId: PLAYGROUND_ROLE, name: 'Playground user', importId: PLAYGROUND_ROLE, description: ''}],
};

/* ------------------------------------------------------------ edge cases
 * The lists are longer than one page (20) so the lists scroll and load the next page, and some items have long texts:
 * long sentences, words without spaces, diacritics, very large numbers.
 */

const FIRST_NAMES = ['Peter', 'Maria', 'Tomas', 'Lucia', 'Martin', 'Zuzana', 'Jozef', 'Katarina', 'Michal', 'Eva', 'Andrej',
    'Jana', 'Lubomir', 'Simona', 'Pavol', 'Veronika'];
const SURNAMES = ['Kovac', 'Horvath', 'Varga', 'Bielik', 'Toth', 'Nagy', 'Balaz', 'Molnar', 'Simko', 'Kral', 'Lukac', 'Polak'];

/** deterministic "random" item of a list */
function pick<T>(list: Array<T>, i: number, salt = 0): T {
    return list[(i * 7 + salt * 13 + 3) % list.length];
}

export const LONG_NAME = {name: 'Alexandra Maximiliána', surname: 'Konstantínová-Wittelsbachová von Hohenstein und Schönberg'};
export const LONG_EMAIL = 'alexandra.maximiliana.konstantinova-wittelsbachova@insurance-department.example-company.com';
export const LONG_WORD = 'Krankenversicherungsleistungsabrechnungsverfahrensrückerstattungsantragsbearbeitung';
export const LONG_SENTENCE = 'Water damage caused by a burst pipe on the third floor affecting two neighbouring apartments, '
    + 'the staircase and the basement storage rooms';
export const LONG_TEXT = 'The pipe burst at night while the owners were on holiday. The water flooded the kitchen and the living room, '
    + 'leaked through the ceiling into two apartments below and into the basement storage rooms. The caretaker closed the main valve '
    + 'in the morning; the damage was documented by photos and by the report of the plumbing company. '
    + 'Further costs (drying of the walls, new floors, replacement of the kitchen units) will be added after the assessment.';

function user(i: number, first: string, last: string, email?: string): any {
    return {id: `user-${i}`, email: email ?? `${first}.${last}${i}@netgrif.com`.toLowerCase(), name: first, surname: last,
        fullName: `${first} ${last}`, groups: [], authorities: [{authority: 'ROLE_USER'}], nextGroups: [], processRoles: []};
}

export const OTHER_USERS = [
    {id: 'john', email: 'john.smith@netgrif.com', name: 'John', surname: 'Smith', fullName: 'John Smith',
        groups: [], authorities: [{authority: 'ROLE_USER'}], nextGroups: [], processRoles: []},
    {id: 'eva', email: 'eva.novak@netgrif.com', name: 'Eva', surname: 'Novak', fullName: 'Eva Novak',
        groups: [], authorities: [{authority: 'ROLE_USER'}], nextGroups: [], processRoles: [PLAYGROUND_USER.processRoles[0]]},
    user(0, LONG_NAME.name, LONG_NAME.surname, LONG_EMAIL),
    user(1, 'Ľubomír', 'Šťastný-Ďurčanský', 'lubomir.stastny-durcansky@netgrif.com'),
    ...Array.from({length: 30}, (_, i) => user(i + 2, pick(FIRST_NAMES, i), pick(SURNAMES, i, 1))),
];

export type FieldType = 'text' | 'number' | 'boolean' | 'enumeration_map' | 'multichoice_map' | 'date' | 'dateTime'
    | 'button' | 'i18n' | 'user' | 'file' | 'fileList';

/** Definition of a process field, `value` is the initial value of new cases. */
export interface MockField {
    id: string;
    type: FieldType;
    name: string;
    description?: string;
    placeholder?: string;
    options?: { [key: string]: string };
    component?: { name: string, properties?: { [key: string]: string } };
    value?: any;
}

/** A field on a task form: field id, behavior and grid position. */
export interface MockDataRef {
    id: string;
    behavior: 'editable' | 'visible' | 'required';
    x: number;
    y: number;
    cols?: number;
}

export interface MockTransition {
    id: string;
    title: string;
    icon?: string;
    groups: Array<{ title?: string, fields: Array<MockDataRef> }>;
}

export interface MockNet {
    stringId: string;
    identifier: string;
    title: string;
    initials: string;
    defaultCaseName: string;
    icon: string;
    /** fields shown as immediate data of the cases (case headers, builder process state) */
    immediate?: Array<string>;
    fields: Array<MockField>;
    transitions: Array<MockTransition>;
    /** roles of the process (only in the Petriflow XML of the builder) */
    roles?: Array<{id: string, title: string}>;
    /** transitions enabled in a new case */
    initialTransitions: Array<string>;
    /** transition finished -> transitions enabled afterwards */
    flow: { [transitionId: string]: Array<string> };
}

export const NETS: Array<MockNet> = [
    {
        stringId: 'net-claim',
        identifier: 'insurance_claim',
        title: 'Insurance claim',
        initials: 'CLM',
        defaultCaseName: 'Claim',
        icon: 'shield',
        immediate: ['client', 'amount', 'description'],
        fields: [
            {id: 'client', type: 'text', name: 'Client', placeholder: 'Full name', value: ''},
            {id: 'email', type: 'text', name: 'E-mail', placeholder: 'client@example.com', value: ''},
            {id: 'type', type: 'enumeration_map', name: 'Claim type', value: 'car',
                options: {car: 'Car accident', home: 'Home damage', travel: 'Travel', health: 'Health'}},
            {id: 'amount', type: 'number', name: 'Claimed amount', value: 0,
                component: {name: 'currency', properties: {code: 'EUR', locale: 'sk-SK', fractionSize: '2'}}},
            {id: 'incident', type: 'date', name: 'Date of incident'},
            {id: 'reported', type: 'dateTime', name: 'Reported at'},
            {id: 'description', type: 'text', name: 'Description', component: {name: 'textarea'}, value: ''},
            {id: 'documents', type: 'multichoice_map', name: 'Attached documents', value: [],
                options: {photos: 'Photos', police: 'Police report', invoice: 'Invoice', medical: 'Medical report'}},
            {id: 'approved', type: 'boolean', name: 'Claim approved', value: false},
            {id: 'decision', type: 'text', name: 'Decision note', component: {name: 'textarea'}, value: ''},
            {id: 'photo', type: 'file', name: 'Photo of the damage', description: 'An image or a PDF', component: {name: 'preview'}},
            {id: 'attachments', type: 'fileList', name: 'Other documents', description: 'Police report, invoices, medical reports',
                value: {namesPaths: []}},
            {id: 'paid', type: 'number', name: 'Paid amount', value: 0,
                component: {name: 'currency', properties: {code: 'EUR', locale: 'sk-SK', fractionSize: '2'}}},
            // edge cases of the builder lists and details (not on the forms): long title, long id, word without spaces
            {id: 'note_for_legal', type: 'text', name: LONG_SENTENCE, value: ''},
            {id: 'regional_manager_decision_justification_for_the_legal_department', type: 'text', name: 'Justification', value: ''},
            {id: 'settlement_procedure', type: 'text', name: LONG_WORD, value: ''},
        ],
        roles: [
            {id: 'clerk', title: 'Claims clerk'},
            {id: 'manager', title: 'Regional manager responsible for the approval of claims above the limit of the branch office'},
            {id: 'Leistungsabrechnungsverfahrenssachbearbeiter', title: LONG_WORD},
        ],
        transitions: [
            {
                id: 'register', title: 'Register claim', icon: 'edit_note', groups: [
                    {title: 'Client', fields: [
                        {id: 'client', behavior: 'required', x: 0, y: 0, cols: 2},
                        {id: 'email', behavior: 'editable', x: 2, y: 0, cols: 2},
                    ]},
                    {title: 'Incident', fields: [
                        {id: 'type', behavior: 'required', x: 0, y: 0, cols: 2},
                        {id: 'amount', behavior: 'required', x: 2, y: 0, cols: 2},
                        {id: 'incident', behavior: 'editable', x: 0, y: 1, cols: 2},
                        {id: 'reported', behavior: 'editable', x: 2, y: 1, cols: 2},
                        {id: 'description', behavior: 'editable', x: 0, y: 2, cols: 4},
                        {id: 'documents', behavior: 'editable', x: 0, y: 3, cols: 4},
                        {id: 'photo', behavior: 'editable', x: 0, y: 4, cols: 4},
                        {id: 'attachments', behavior: 'editable', x: 0, y: 5, cols: 4},
                    ]},
                ],
            },
            {
                id: 'assess', title: 'Assess claim', icon: 'fact_check', groups: [
                    {title: 'Claim', fields: [
                        {id: 'client', behavior: 'visible', x: 0, y: 0, cols: 2},
                        {id: 'type', behavior: 'visible', x: 2, y: 0, cols: 2},
                        {id: 'amount', behavior: 'visible', x: 0, y: 1, cols: 2},
                        {id: 'incident', behavior: 'visible', x: 2, y: 1, cols: 2},
                        {id: 'description', behavior: 'visible', x: 0, y: 2, cols: 4},
                    ]},
                    {title: 'Decision', fields: [
                        {id: 'approved', behavior: 'editable', x: 0, y: 0, cols: 2},
                        {id: 'decision', behavior: 'required', x: 0, y: 1, cols: 4},
                    ]},
                ],
            },
            {
                id: 'pay', title: 'Pay out', icon: 'payments', groups: [
                    {fields: [
                        {id: 'client', behavior: 'visible', x: 0, y: 0, cols: 2},
                        {id: 'amount', behavior: 'visible', x: 2, y: 0, cols: 2},
                        {id: 'paid', behavior: 'required', x: 0, y: 1, cols: 2},
                    ]},
                ],
            },
        ],
        initialTransitions: ['register'],
        flow: {register: ['assess'], assess: ['pay'], pay: []},
    },
    {
        stringId: 'net-leave',
        identifier: 'leave_request',
        title: 'Leave request',
        initials: 'LVE',
        // no default case name: the new case dialog asks for the title (Insurance claim names its cases itself)
        defaultCaseName: '',
        icon: 'beach_access',
        fields: [
            {id: 'employee', type: 'text', name: 'Employee', value: ''},
            {id: 'kind', type: 'enumeration_map', name: 'Kind of leave', value: 'vacation',
                options: {vacation: 'Vacation', sick: 'Sick leave', unpaid: 'Unpaid leave'}},
            {id: 'from', type: 'date', name: 'From'},
            {id: 'to', type: 'date', name: 'To'},
            {id: 'days', type: 'number', name: 'Working days', value: 1},
            {id: 'note', type: 'text', name: 'Note', component: {name: 'textarea'}, value: ''},
            {id: 'approved', type: 'boolean', name: 'Approved', value: false},
        ],
        transitions: [
            {
                id: 'request', title: 'Request leave', icon: 'event', groups: [
                    {fields: [
                        {id: 'employee', behavior: 'required', x: 0, y: 0, cols: 2},
                        {id: 'kind', behavior: 'required', x: 2, y: 0, cols: 2},
                        {id: 'from', behavior: 'required', x: 0, y: 1, cols: 2},
                        {id: 'to', behavior: 'required', x: 2, y: 1, cols: 2},
                        {id: 'days', behavior: 'editable', x: 0, y: 2, cols: 2},
                        {id: 'note', behavior: 'editable', x: 0, y: 3, cols: 4},
                    ]},
                ],
            },
            {
                id: 'approve', title: 'Approve leave', icon: 'task_alt', groups: [
                    {fields: [
                        {id: 'employee', behavior: 'visible', x: 0, y: 0, cols: 2},
                        {id: 'kind', behavior: 'visible', x: 2, y: 0, cols: 2},
                        {id: 'from', behavior: 'visible', x: 0, y: 1, cols: 2},
                        {id: 'to', behavior: 'visible', x: 2, y: 1, cols: 2},
                        {id: 'approved', behavior: 'editable', x: 0, y: 2, cols: 2},
                    ]},
                ],
            },
        ],
        initialTransitions: ['request'],
        flow: {request: ['approve'], approve: []},
    },
];

/** Initial cases: net, title, color, field values and the transitions already finished. */
export const INITIAL_CASES: Array<{ id?: string, net: string, title: string, color?: string, values: { [id: string]: any }, finished: Array<string> }> = [
    {id: 'claim-windshield', net: 'net-claim', title: 'Broken windshield', values: {client: 'Peter Kovac', email: 'peter@example.com', type: 'car', amount: 420,
            incident: '2026-10-12', reported: '2026-10-12T14:30', description: 'Stone hit the windshield on the highway.',
            documents: ['photos', 'invoice']}, finished: ['register']},
    {id: 'claim-kitchen', net: 'net-claim', title: 'Flooded kitchen', color: 'panel-accent-icon', values: {client: 'Maria Horvath', type: 'home', amount: 3200,
            incident: '2026-09-28', description: 'Burst pipe under the sink.', documents: ['photos']}, finished: ['register', 'assess']},
    {id: 'claim-luggage', net: 'net-claim', title: 'Lost luggage', values: {client: 'Tomas Varga', type: 'travel', amount: 650,
            photo: {name: 'claim-photo.png'}}, finished: []},
    {id: 'claim-ski', net: 'net-claim', title: 'Ski accident', values: {client: 'Lucia Bielik', type: 'health', amount: 1800, incident: '2026-02-03'},
        finished: []},
    {id: 'leave-summer', net: 'net-leave', title: 'Summer vacation', values: {employee: 'Jane Doe', kind: 'vacation', from: '2026-07-06', to: '2026-07-17',
            days: 10}, finished: ['request']},
    {id: 'leave-doctor', net: 'net-leave', title: 'Doctor visit', values: {employee: 'John Smith', kind: 'sick', from: '2026-11-09', to: '2026-11-09'},
        finished: []},
];

const CLAIM_TITLES = ['Broken window', 'Car scratch', 'Stolen bicycle', 'Hail damage', 'Water leak', 'Broken leg', 'Lost phone',
    'Fire in the garage', 'Damaged roof', 'Flight delay', 'Theft from the car', 'Dog bite'];
const CLAIM_TYPES = ['car', 'home', 'travel', 'health'];
const LEAVE_KINDS = ['vacation', 'sick', 'unpaid'];

function isoDate(day: number): string {
    const date = new Date(Date.UTC(2026, 0, 1) + day * 86400000);
    return date.toISOString().substring(0, 10);
}

/** edge cases (the first three) and ordinary cases to fill several pages */
const GENERATED_CASES: typeof INITIAL_CASES = [
    {id: 'claim-long-title', net: 'net-claim', title: LONG_SENTENCE,
        values: {client: `${LONG_NAME.name} ${LONG_NAME.surname}`, email: LONG_EMAIL, type: 'home', amount: 123456789.99,
            incident: '2026-10-30', reported: '2026-10-31T07:15', description: LONG_TEXT, documents: ['photos', 'police', 'invoice', 'medical']},
        finished: []},
    {id: 'claim-long-word', net: 'net-claim', title: LONG_WORD,
        values: {client: LONG_WORD, type: 'health', amount: 0.01, description: LONG_WORD + LONG_WORD}, finished: ['register']},
    {id: 'claim-diacritics', net: 'net-claim', title: 'Poškodenie strechy počas búrky – Ľubomír Šťastný-Ďurčanský',
        color: 'panel-accent-icon', values: {client: 'Ľubomír Šťastný-Ďurčanský', type: 'home', amount: 7890.5,
            description: 'Víchrica strhla časť strechy, voda zatiekla do podkrovia.'}, finished: []},
    ...Array.from({length: 40}, (_, i) => ({
        id: `claim-gen${i}`, net: 'net-claim', title: `${pick(CLAIM_TITLES, i)} #${i + 1}`,
        values: {client: `${pick(FIRST_NAMES, i, 2)} ${pick(SURNAMES, i, 3)}`, type: pick(CLAIM_TYPES, i), amount: 50 + (i * 379) % 9000,
            incident: isoDate(i * 7 % 300), description: i % 5 === 0 ? LONG_TEXT : ''},
        finished: [[], ['register'], ['register', 'assess']][i % 3],
    })),
    ...Array.from({length: 14}, (_, i) => ({
        id: `leave-gen${i}`, net: 'net-leave', title: `Leave of ${pick(FIRST_NAMES, i, 4)} ${pick(SURNAMES, i, 5)}`,
        values: {employee: `${pick(FIRST_NAMES, i, 4)} ${pick(SURNAMES, i, 5)}`, kind: pick(LEAVE_KINDS, i), from: isoDate(150 + i * 9),
            to: isoDate(152 + i * 9), days: 1 + i % 10, note: i === 0 ? LONG_TEXT : ''},
        finished: i % 2 === 0 ? [] : ['request'],
    })),
];
// later cases are newer and the lists are sorted by the creation date: the edge cases are pushed last to be on top
INITIAL_CASES.push(...GENERATED_CASES.slice(3), ...GENERATED_CASES.slice(0, 3));

// roles of some users for the role assignment (ids `<process>-<role>`, see MockEngine processRole)
OTHER_USERS[0].processRoles = [{stringId: 'insurance_claim-clerk', name: 'Claims clerk', importId: 'clerk', description: ''}];
OTHER_USERS[1].processRoles = [...OTHER_USERS[1].processRoles,
    {stringId: 'insurance_claim-manager', name: 'Regional manager responsible for the approval of claims above the limit of the branch office',
        importId: 'manager', description: ''}];

/** LDAP groups of the mock engine (ldap/search, ldap/role/assign), the assigned roles are kept until a reload */
export interface MockLdapGroup {
    dn: string;
    cn: string;
    description?: string;
    roleIds: Array<string>;
}

export const LDAP_GROUPS: Array<MockLdapGroup> = [
    {dn: 'cn=claims-handlers,ou=groups,dc=netgrif,dc=com', cn: 'Claims handlers', description: 'Handle the insurance claims', roleIds: [PLAYGROUND_ROLE]},
    {dn: 'cn=hr,ou=groups,dc=netgrif,dc=com', cn: 'HR', description: 'Human resources', roleIds: []},
    {dn: 'cn=managers,ou=groups,dc=netgrif,dc=com', cn: 'Managers', description: 'Approve the leave requests', roleIds: ['insurance_claim-manager']},
    {dn: 'cn=it-support,ou=groups,dc=netgrif,dc=com', cn: 'IT support', roleIds: []},
    {dn: 'cn=auditors,ou=groups,dc=netgrif,dc=com', cn: 'Auditors', description: 'Read-only access for the audits', roleIds: []},
    {dn: 'cn=regional-claims-managers-central-europe,ou=claims-department,ou=groups,ou=bratislava,dc=insurance,dc=example,dc=com',
        cn: 'Regional claims managers of the Central Europe region and the external assessors',
        description: LONG_TEXT, roleIds: []},
    {dn: `cn=${LONG_WORD.toLowerCase()},ou=groups,dc=netgrif,dc=com`, cn: LONG_WORD, roleIds: []},
    ...Array.from({length: 24}, (_, i) => ({
        dn: `cn=team-${i + 1},ou=teams,ou=groups,dc=netgrif,dc=com`, cn: `Team ${pick(SURNAMES, i)} ${i + 1}`,
        description: i % 3 === 0 ? undefined : `Members of the ${pick(CLAIM_TITLES, i).toLowerCase()} team`, roleIds: [],
    })),
];
