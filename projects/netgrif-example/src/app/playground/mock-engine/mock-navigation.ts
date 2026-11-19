import {LONG_SENTENCE, LONG_WORD, MockNet, NETS} from './mock-data';

/**
 * Engine data of the dynamic navigation and the dashboard, in the engine's case format:
 * - URI nodes (`uri/*` endpoints) of the menu folders,
 * - `menu_item` cases: folders (`is_folder`) and views, the tree is defined by `nodePath` and `childItemIds`,
 * - `dashboard_management` case `main_dashboard` and its `dashboard_item` cases (tiles linking to menu items or URLs).
 *
 * The double drawer, breadcrumbs and the dashboard of the libraries read only the immediate data of these cases.
 */

/** Route of the menu items in the playground, see `services.groupNavigation.groupNavigationRoute`. */
export const NAVIGATION_ROUTE = 'views/navigation/item';

/** What the playground shows for a menu item view (netgrif-frontend resolves it from the item task data). */
export type MenuItemView = 'cases' | 'tasks' | 'tabbed' | 'tickets' | 'processes';

interface MenuItemDef {
    id: string;
    name: string;
    icon: string;
    nodePath: string;
    folder?: boolean;
    view?: MenuItemView;
    /** processes the view shows */
    nets?: Array<string>;
    children?: Array<string>;
}

export const MENU_ITEMS: Array<MenuItemDef> = [
    {id: 'menu-root', name: 'Root', icon: 'home', nodePath: '/', folder: true, children: ['menu-claims', 'menu-hr', 'menu-tickets', 'menu-all-tasks', 'menu-processes']},
    {id: 'menu-claims', name: 'Claims', icon: 'shield', nodePath: '/claims', folder: true,
        children: ['menu-claims-cases', 'menu-claims-tasks', 'menu-claims-waiting']},
    {id: 'menu-claims-cases', name: 'All claims', icon: 'folder_open', nodePath: '/claims/all', view: 'tabbed', nets: ['insurance_claim']},
    {id: 'menu-claims-tasks', name: 'Claim tasks', icon: 'assignment', nodePath: '/claims/tasks', view: 'tasks', nets: ['insurance_claim']},
    // edge case: long name in the drawer and in the breadcrumbs
    {id: 'menu-claims-waiting', name: 'Claims waiting for the decision of the regional manager and the legal department',
        icon: 'hourglass_top', nodePath: '/claims/waiting', view: 'cases', nets: ['insurance_claim']},
    {id: 'menu-hr', name: 'Human resources', icon: 'groups', nodePath: '/hr', folder: true, children: ['menu-hr-leaves', 'menu-hr-tasks']},
    {id: 'menu-hr-leaves', name: 'Leave requests', icon: 'beach_access', nodePath: '/hr/leaves', view: 'cases', nets: ['leave_request']},
    {id: 'menu-hr-tasks', name: 'Approvals', icon: 'task_alt', nodePath: '/hr/tasks', view: 'tasks', nets: ['leave_request']},
    // ticket view: the views of the folder are the "tickets" a user can create (nc-default-ticket-view)
    {id: 'menu-tickets', name: 'Tickets', icon: 'confirmation_number', nodePath: '/tickets', folder: true,
        children: ['menu-ticket-claim', 'menu-ticket-leave']},
    {id: 'menu-ticket-claim', name: 'Report a claim', icon: 'shield', nodePath: '/tickets/claim', view: 'tasks', nets: ['insurance_claim']},
    {id: 'menu-ticket-leave', name: 'Request leave', icon: 'beach_access', nodePath: '/tickets/leave', view: 'tasks', nets: ['leave_request']},
    {id: 'menu-all-tasks', name: 'All tasks', icon: 'checklist', nodePath: '/tasks', view: 'tasks', nets: ['insurance_claim', 'leave_request']},
    // process view with a visible tab header (process list, a process opens in the builder in a new tab): breadcrumbs above the tabs
    {id: 'menu-processes', name: 'Processes', icon: 'account_tree', nodePath: '/processes', view: 'processes'},
];

export function menuItem(id: string): MenuItemDef | undefined {
    return MENU_ITEMS.find(i => i.id === id);
}

/** URI nodes of the folders */
export const URI_NODES = MENU_ITEMS.filter(i => i.folder).map(i => ({
    id: `uri${i.nodePath === '/' ? '-root' : i.nodePath.replace(/\//g, '-')}`,
    uriPath: i.nodePath,
    name: i.nodePath === '/' ? 'root' : i.nodePath.substring(1),
    parentId: i.nodePath === '/' ? null : 'uri-root',
    level: i.nodePath === '/' ? 0 : 1,
    childrenId: [],
    contentTypes: [],
}));

const i18n = (value: string) => ({defaultValue: value, translations: {}});

function immediate(id: string, type: string, value: any, extra: object = {}): any {
    return {stringId: id, importId: id, title: i18n(id), type, value, ...extra};
}

function rawCase(stringId: string, processIdentifier: string, title: string, immediateData: Array<any>, icon?: string): any {
    return {
        stringId, title, icon, color: '', visualId: stringId, processIdentifier, petriNetId: `net-${processIdentifier}`,
        petriNetObjectId: {timestamp: 0, machineIdentifier: 0, processIdentifier: 0, counter: 0, timeSecond: 0, time: 0, date: 0},
        creationDate: [2026, 1, 15, 9, 0, 0], lastModified: [2026, 1, 15, 9, 0, 0],
        author: {email: 'admin@netgrif.com', fullName: 'Admin'}, immediateData, resetArcTokens: {},
        permissions: {}, users: {}, userRefs: {}, tasks: [],
    };
}

/** task of a menu item with its view configuration (`all_menu_data`), the ticket view reads the processes from it */
export const MENU_DATA_TASK_PREFIX = 'menu-data-';

const menuItemCases = MENU_ITEMS.map(i => withMenuDataTask(i, rawCase(i.id, 'menu_item', i.name, [
    immediate('nodePath', 'text', i.nodePath),
    immediate('menu_name', 'i18n', i18n(i.name)),
    immediate('menu_icon', 'text', i.icon),
    immediate('is_folder', 'boolean', !!i.folder),
    immediate('is_auto_select', 'boolean', false),
    immediate('childItemIds', 'stringCollection', i.children ?? []),
    immediate('view_configuration_type', 'enumeration_map', i.folder ? 'folder' : 'tabbed_case_view'),
    // AuthorityGuardService.canAccessNavigationItem: an item without allowed authorities is never shown
    immediate('allowed_authorities', 'multichoice_map', ['ROLE_USER'], {options: {ROLE_USER: i18n('User')}}),
    immediate('allowed_roles', 'multichoice_map', [], {options: {}}),
    immediate('banned_roles', 'multichoice_map', [], {options: {}}),
], i.icon)));

function withMenuDataTask(item: MenuItemDef, itemCase: any): any {
    if (item.nets) {
        itemCase.tasks = [{transition: 'all_menu_data', task: MENU_DATA_TASK_PREFIX + item.id}];
    }
    return itemCase;
}

/** data of the `all_menu_data` task of a menu item (only the fields the libraries read in the playground) */
export function menuItemData(taskId: string): any {
    const item = menuItem(taskId.substring(MENU_DATA_TASK_PREFIX.length));
    if (!item) {
        return undefined;
    }
    const field = {
        stringId: 'task_allowed_nets', type: 'stringCollection', name: 'Allowed nets', behavior: {visible: true}, order: 0,
        value: item.nets ?? [], layout: {x: 0, y: 0, rows: 1, cols: 4, offset: 0, template: 'material', appearance: 'outline'},
    };
    return {outcome: {data: {_embedded: {dataGroups: [{layout: {type: 'grid', cols: 4, rows: 1}, alignment: 'start', stretch: false,
        fields: {_embedded: {fields: [field]}}}]}}, outcomes: []}};
}

const DASHBOARD_ITEMS = [
    {id: 'dash-claims', name: 'Claims', icon: 'shield', menuItem: 'menu-claims-cases'},
    {id: 'dash-tasks', name: 'All tasks', icon: 'checklist', menuItem: 'menu-all-tasks'},
    {id: 'dash-leaves', name: 'Leave requests', icon: 'beach_access', menuItem: 'menu-hr-leaves'},
    {id: 'dash-docs', name: 'Documentation', icon: 'menu_book', url: 'https://petriflow.com'},
    // edge cases: long name, word without spaces
    {id: 'dash-waiting', name: 'Claims waiting for the decision of the regional manager and the legal department',
        icon: 'hourglass_top', menuItem: 'menu-claims-waiting'},
    {id: 'dash-word', name: LONG_WORD, icon: 'medical_services', menuItem: 'menu-claims-cases'},
];

const dashboardCases = [
    rawCase('dashboard-main', 'dashboard_management', 'Main dashboard', [
        immediate('dashboard_id', 'text', 'main_dashboard'),
        immediate('dashboard_name', 'i18n', i18n('Netgrif playground')),
        immediate('dashboard_logo', 'text', 'assets/img/netgrif_full_grey.svg'),
        immediate('toolbar_color', 'text', ''),
        immediate('simple_dashboard_toolbar', 'boolean', true),
        immediate('profile_dashboard_toolbar', 'boolean', false),
        immediate('language_dashboard_toolbar', 'boolean', false),
        immediate('logout_dashboard_toolbar', 'boolean', false),
        immediate('profile_url', 'text', ''),
        immediate('login_url', 'text', ''),
        immediate('items_order', 'text', DASHBOARD_ITEMS.map(d => d.id).join(',')),
        immediate('dashboard_item_to_menu_item', 'enumeration_map', null, {
            options: Object.fromEntries(DASHBOARD_ITEMS.map(d => [d.id, i18n(d.menuItem ?? '')])),
        }),
    ]),
    ...DASHBOARD_ITEMS.map(d => rawCase(d.id, 'dashboard_item', d.name, [
        immediate('item_name', 'i18n', i18n(d.name)),
        immediate('item_icon', 'text', d.icon),
        immediate('is_internal', 'boolean', !d.url),
        immediate('external_url', 'text', d.url ?? ''),
        // true = item_icon is an image URL, false = Material icon name
        immediate('external_icon', 'boolean', false),
        immediate('font_color', 'text', ''),
        immediate('font_weight', 'text', ''),
        immediate('icon_color', 'text', ''),
    ], d.icon)),
];

/** Cases of the navigation and the dashboard, read-only. */
export const RAW_CASES: Array<any> = [...menuItemCases, ...dashboardCases];

/* ------------------------------------------------------------------ builder processes */

/**
 * Petriflow XML of a mock process: its data, the transitions with their forms and places between the transitions
 * following `flow`, so the builder opens a readable net.
 */
export function petriflowXml(net: MockNet): string {
    const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const lines: Array<string> = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://petriflow.com/petriflow.schema.xsd">',
        `    <id>${net.identifier}</id>`, '    <version>1.0.0</version>', `    <initials>${net.initials}</initials>`,
        `    <title>${esc(net.title)}</title>`, `    <icon>${net.icon}</icon>`,
        '    <defaultRole>true</defaultRole>', '    <anonymousRole>false</anonymousRole>', '    <transitionRole>false</transitionRole>',
        `    <caseName>${esc(net.defaultCaseName)}</caseName>`,
    ];
    // roles before the data (order of the Petriflow schema)
    (net.roles ?? []).forEach(r => lines.push('    <role>', `        <id>${r.id}</id>`, `        <title>${esc(r.title)}</title>`, '    </role>'));
    net.fields.forEach(f => {
        const type = f.type === 'enumeration_map' ? 'enumeration_map' : f.type === 'multichoice_map' ? 'multichoice_map' : f.type;
        lines.push(`    <data type="${type}">`, `        <id>${f.id}</id>`, `        <title>${esc(f.name)}</title>`);
        if (f.options) {
            lines.push('        <options>', ...Object.entries(f.options).map(([k, v]) => `            <option key="${k}">${esc(v)}</option>`),
                '        </options>');
        }
        lines.push('    </data>');
    });
    const x = (i: number) => 140 + i * 240;
    net.transitions.forEach((t, i) => {
        lines.push('    <transition>', `        <id>${t.id}</id>`, `        <x>${x(i) + 120}</x>`, '        <y>180</y>',
            `        <label>${esc(t.title)}</label>`, `        <icon>${t.icon ?? ''}</icon>`);
        t.groups.forEach((g, gi) => {
            lines.push('        <dataGroup>', `            <id>${t.id}_${gi}</id>`, '            <cols>4</cols>', '            <layout>grid</layout>');
            if (g.title) {
                lines.push(`            <title>${esc(g.title)}</title>`);
            }
            g.fields.forEach(ref => lines.push('            <dataRef>', `                <id>${ref.id}</id>`,
                `                <logic><behavior>${ref.behavior === 'required' ? 'editable' : ref.behavior}</behavior>`
                + `${ref.behavior === 'required' ? '<behavior>required</behavior>' : ''}</logic>`,
                `                <layout><x>${ref.x}</x><y>${ref.y}</y><rows>1</rows><cols>${ref.cols ?? 2}</cols>`
                + '<template>material</template><appearance>outline</appearance></layout>',
                '            </dataRef>'));
            lines.push('        </dataGroup>');
        });
        lines.push('    </transition>');
    });
    // a place before every transition and one at the end
    net.transitions.forEach((t, i) => lines.push('    <place>', `        <id>p_${t.id}</id>`, `        <x>${x(i)}</x>`, '        <y>180</y>',
        `        <label>${i === 0 ? 'new' : ''}</label>`, `        <tokens>${i === 0 ? 1 : 0}</tokens>`, '        <static>false</static>', '    </place>'));
    lines.push('    <place>', '        <id>p_done</id>', `        <x>${x(net.transitions.length)}</x>`, '        <y>180</y>', '        <label>done</label>',
        '        <tokens>0</tokens>', '        <static>false</static>', '    </place>');
    let arc = 0;
    net.transitions.forEach((t, i) => {
        const next = net.transitions[i + 1] ? `p_${net.transitions[i + 1].id}` : 'p_done';
        lines.push(`    <arc><id>a${arc++}</id><type>regular</type><sourceId>p_${t.id}</sourceId><destinationId>${t.id}</destinationId><multiplicity>1</multiplicity></arc>`);
        lines.push(`    <arc><id>a${arc++}</id><type>regular</type><sourceId>${t.id}</sourceId><destinationId>${next}</destinationId><multiplicity>1</multiplicity></arc>`);
    });
    lines.push('</document>');
    return lines.join('\n');
}

/** `process` net of the builder: one case per process, the `form` task holds the XML (`xml_text`). */
export const PROCESS_NET: MockNet = {
    stringId: 'net-process',
    identifier: 'process',
    title: 'Process',
    initials: 'PRC',
    defaultCaseName: 'Process',
    icon: 'account_tree',
    immediate: ['title', 'id', 'version', 'state'],
    fields: [
        {id: 'title', type: 'text', name: 'Title', value: ''},
        {id: 'id', type: 'text', name: 'Identifier', value: ''},
        {id: 'version', type: 'text', name: 'Version', value: '1.0.0'},
        {id: 'state', type: 'text', name: 'State', value: 'draft'},
        {id: 'xml_text', type: 'text', name: 'Petriflow XML', value: ''},
    ],
    transitions: [
        // the builder edits the XML through this task, it is not listed in the task mode of the builder
        {id: 'form', title: 'Edit process', icon: 'edit', groups: [{fields: [{id: 'xml_text', behavior: 'editable', x: 0, y: 0, cols: 4}]}]},
        // tasks of the builder's task mode (BuilderIntegrationService.allowedTransIds)
        {id: 'deploy', title: 'Deploy process', icon: 'rocket_launch', groups: [{title: 'Process', fields: [
            {id: 'title', behavior: 'visible', x: 0, y: 0, cols: 2},
            {id: 'id', behavior: 'visible', x: 2, y: 0, cols: 2},
            {id: 'version', behavior: 'required', x: 0, y: 1, cols: 2},
        ]}]},
        {id: 'view', title: 'Process detail', icon: 'info', groups: [{title: 'Process', fields: [
            {id: 'title', behavior: 'visible', x: 0, y: 0, cols: 2},
            {id: 'id', behavior: 'visible', x: 2, y: 0, cols: 2},
            {id: 'version', behavior: 'visible', x: 0, y: 1, cols: 2},
            {id: 'state', behavior: 'visible', x: 2, y: 1, cols: 2},
        ]}]},
    ],
    initialTransitions: ['form', 'deploy'],
    // finishing deploy sets the state to deployed (MockEngine.finish)
    flow: {form: ['form'], deploy: ['view'], view: ['view']},
};

/** Initial `process` cases: the two mock processes, one as a draft, one deployed. */
/** more processes (copies of the mock processes) so the process list has more than one page, with long titles */
const PROCESS_COPIES: Array<MockNet> = Array.from({length: 22}, (_, i) => {
    const base = NETS[i % NETS.length];
    const title = i === 0 ? LONG_SENTENCE : i === 1 ? LONG_WORD : `${base.title} – variant ${i + 1}`;
    return {...base, stringId: `${base.stringId}-copy${i}`, identifier: `${base.identifier}_variant_${i + 1}`, title};
});

export const PROCESS_CASES = [...PROCESS_COPIES, ...NETS].map((net, i) => ({
    id: `process-${net.identifier}`,
    net: PROCESS_NET.stringId,
    title: net.title,
    values: {title: net.title, id: net.identifier, version: '1.0.0', state: 'draft', xml_text: petriflowXml(net)},
    // the insurance claim and every third copy stay drafts, the others are deployed
    finished: net === NETS[0] || (i < PROCESS_COPIES.length && i % 3 === 0) ? [] as Array<string> : ['deploy'],
}));
