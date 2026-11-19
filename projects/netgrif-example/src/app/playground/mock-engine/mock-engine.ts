import {IMPERSONATION_CASES, IMPERSONATION_NET} from './mock-impersonation';
import {INITIAL_CASES, LDAP_GROUPS, MockField, MockNet, MockTransition, NETS, OTHER_USERS, PLAYGROUND_ROLE, PLAYGROUND_USER} from './mock-data';
import {compilePfql} from './mock-pfql';
import {samplePhoto} from './mock-files';

/** tokens of the e-mail links of the account forms (registration, forgotten password): token -> e-mail of the account */
export const ACCOUNT_TOKENS: { [token: string]: string } = {
    'valid-token': 'new.user@netgrif.com',
};
import {MENU_DATA_TASK_PREFIX, menuItemData, PROCESS_CASES, PROCESS_NET, RAW_CASES, URI_NODES} from './mock-navigation';

/** processes with cases and tasks (the `process` net backs the builder view) */
/** a role of a process as the engine sends it (`<process>-<role>` ids, unique over the processes) */
function processRole(net: MockNet, role: {id: string, title: string}): any {
    return {stringId: `${net.identifier}-${role.id}`, name: role.title, importId: role.id, description: '', netImportId: net.identifier};
}

const ALL_NETS: Array<MockNet> = [...NETS, PROCESS_NET, IMPERSONATION_NET];

/**
 * In-memory Netgrif Application Engine of the playground. It answers the REST API calls of the libraries
 * (`OfflineHttpInterceptor`) in the engine's response format: cases, tasks, task forms, task events
 * (assign, finish, cancel, delegate), setting data, creating and deleting cases.
 *
 * The state lives in memory only, a page reload starts from `mock-data.ts` again.
 */
export interface MockRequest {
    method: string;
    /** path relative to the engine address, without query, e.g. `workflow/case/search` */
    path: string;
    params: { get(name: string): string | null };
    body: any;
    headers?: { get(name: string): string | null };
}

/** Response of the mock engine, `undefined` = endpoint not mocked. */
export type MockResponse = { status?: number, body: any } | undefined;

interface CaseState {
    stringId: string;
    net: MockNet;
    title: string;
    color: string;
    creationDate: Date;
    values: { [fieldId: string]: any };
}

interface TaskState {
    stringId: string;
    caseId: string;
    transition: MockTransition;
    user?: typeof PLAYGROUND_USER;
    startDate?: Date;
}

/**
 * Layout of the task forms (Petriflow `<transition><layout>`, `<dataGroup>` and `<dataRef><layout>`).
 * Shared and mutable: the single task demo changes it to show how the layout changes the form.
 */
export const FORM_LAYOUT = {
    /** task layout */
    cols: 4,
    fieldAlignment: 'center' as 'top' | 'center' | 'bottom',
    /** data groups */
    type: 'grid' as 'grid' | 'flow' | 'legacy',
    alignment: 'start' as 'start' | 'center' | 'end',
    stretch: false,
    compactDirection: 'none' as 'none' | 'up',
    hideEmptyRows: 'none' as 'none' | 'all' | 'compacted',
    /** fields */
    template: 'material' as 'material' | 'netgrif',
};

export const DEFAULT_FORM_LAYOUT = {...FORM_LAYOUT};

const ALL_TASK_PERMISSIONS = {view: true, assign: true, cancel: true, finish: true, delegate: true, perform: true, set: true};
const ALL_CASE_PERMISSIONS = {view: true, create: true, delete: true};

export class MockEngine {

    private _cases: Array<CaseState> = [];
    private _tasks: Array<TaskState> = [];
    private _counter = 1;

    constructor() {
        const initial: Array<{ id?: string, net: string, title: string, color?: string, values: { [id: string]: any }, finished: Array<string> }>
            = [...INITIAL_CASES, ...PROCESS_CASES, ...IMPERSONATION_CASES];
        initial.forEach((c, i) => {
            const net = this.net(c.net);
            const state = this.createCaseState(net, c.title, c.color, c.id);
            state.creationDate = new Date(Date.now() - (initial.length - i) * 86400000);
            Object.assign(state.values, c.values);
            c.finished.forEach(transitionId => {
                const task = this._tasks.find(t => t.caseId === state.stringId && t.transition.id === transitionId);
                if (task) {
                    this.finish(task);
                }
            });
        });
    }

    /** files of the file / file list fields: "<task id>/<field id>/<file name>" -> file */
    private readonly _files = new Map<string, File>([
        ['demo-task/demo_field/claim-photo.png', samplePhoto()],
        ['claim-luggage-register/photo/claim-photo.png', samplePhoto()],
    ]);

    private fileKeys(taskId: string, fieldId: string): Array<string> {
        return [...this._files.keys()].filter(key => key.startsWith(`${taskId}/${fieldId}/`));
    }

    /** the value of a file / file list field of the case of the task after an upload or a delete */
    private updateFileValue(taskId: string, fieldId: string): void {
        const state = this._cases.find(c => c.stringId === this._tasks.find(t => t.stringId === taskId)?.caseId);
        const field = state?.net.fields.find(f => f.id === fieldId);
        if (!state || !field) {
            return;
        }
        const names = this.fileKeys(taskId, fieldId).map(key => key.substring(key.lastIndexOf('/') + 1));
        state.values[fieldId] = field.type === 'fileList' ? {namesPaths: names.map(name => ({name}))} : (names[0] ? {name: names[0]} : undefined);
    }

    /** upload, download, preview and delete of the files of a task (`task/:id/file`, `/files`, `/file/named`, `/file_preview`) */
    private handleFiles(request: MockRequest, taskId: string, action: string): MockResponse {
        const outcome = {success: 'ok', outcome: {outcomes: []}};
        if (request.method === 'POST') {
            const fieldId = request.body?.data?.fieldId;
            const files: Array<File> = request.body?.files ?? [];
            if (!fieldId || files.length === 0) {
                return {status: 400, body: {error: 'No file'}};
            }
            if (action === 'file') {
                this.fileKeys(taskId, fieldId).forEach(key => this._files.delete(key));
            }
            files.forEach(file => this._files.set(`${taskId}/${fieldId}/${file.name}`, file));
            this.updateFileValue(taskId, fieldId);
            return {body: outcome};
        }
        const fieldId = request.method === 'DELETE' ? request.body?.fieldId : request.params.get('fieldId');
        const fileName = request.method === 'DELETE' ? request.body?.fileName : request.params.get('fileName');
        const keys = this.fileKeys(taskId, fieldId).filter(key => !fileName || key.endsWith(`/${fileName}`));
        if (request.method === 'DELETE') {
            keys.forEach(key => this._files.delete(key));
            this.updateFileValue(taskId, fieldId);
            return {body: {success: 'File deleted'}};
        }
        const file = keys.length > 0 ? this._files.get(keys[0]) : undefined;
        // the engine renders a preview image of a file, the mock has one only for images
        if (action === 'file_preview' && file && !file.type.startsWith('image/')) {
            return {status: 404, body: {error: 'No preview'}};
        }
        return file ? {body: file} : {status: 404, body: {error: 'File not found'}};
    }

    handle(request: MockRequest): MockResponse {
        const {method, path} = request;
        let m: RegExpMatchArray | null;
        const ok = (body: any) => ({body});

        // user, the session of the playground is always valid
        if (path === 'auth/login') {
            // login form: any credentials log in as the playground user, except the password "wrong"
            const basic = request.headers?.get('Authorization')?.match(/^Basic (.+)$/)?.[1];
            const password = basic ? atob(basic).split(':').slice(1).join(':') : undefined;
            // 400, not the 401 of the engine: the AuthenticationInterceptor redirects a 401 to the login path, which is the
            // overview page in the playground (in an application the user stays on the login page with the error)
            return password === 'wrong' ? {status: 400, body: {error: 'Bad credentials'}} : ok(PLAYGROUND_USER);
        }

        // files of the file / file list fields
        const fileRoute = path.match(/^task\/([^/]+)\/(file|files|file_preview)(?:\/named)?$/);
        if (fileRoute) {
            return this.handleFiles(request, fileRoute[1], fileRoute[2]);
        }

        // account forms (registration, forgotten password, change password): see ACCOUNT_TOKENS
        if (path === 'auth/token/verify') {
            const email = ACCOUNT_TOKENS[String(request.body ?? '').trim()];
            return email ? ok({success: email}) : {status: 400, body: {error: 'The link is invalid or has expired'}};
        }
        if (path === 'auth/signup') {
            return ACCOUNT_TOKENS[request.body?.token]
                ? ok({success: 'Account created'}) : {status: 400, body: {error: 'The link is invalid or has expired'}};
        }
        if (path === 'auth/recover') {
            return ACCOUNT_TOKENS[request.body?.token]
                ? ok({success: 'Password changed'}) : {status: 400, body: {error: 'The link is invalid or has expired'}};
        }
        if (path === 'auth/reset' || path === 'auth/invite') {
            return ok({success: 'E-mail sent'});
        }
        if (path === 'auth/changePassword') {
            // the form sends the passwords in base64, the current password of the playground user is "password"
            const current = (() => { try { return atob(request.body?.password ?? ''); } catch { return ''; } })();
            return current === 'password'
                ? ok({success: 'Password changed'}) : {status: 400, body: {error: 'The current password is wrong'}};
        }
        if (path === 'auth/logout') {
            return ok({success: 'Logged out'});
        }
        if (path === 'user/me' || path === 'public/user/me') {
            return ok(PLAYGROUND_USER);
        }
        // users the admin can impersonate (ImpersonationUserResourceService, resource "impersonation")
        if (path === 'impersonate/search' || path === '/impersonate/search') {
            return ok(this.page('users', [...OTHER_USERS], request));
        }
        // organizations (groups) of the engine, the user invite assigns them to the invited user
        if (path === 'group/all') {
            return ok({groups: [
                {id: 1, name: 'Netgrif'},
                {id: 2, name: 'Insurance department'},
                {id: 3, name: 'Regional branch office Central Europe of the insurance department and the external assessors'},
                {id: 4, name: 'Human resources'},
            ]});
        }
        // roles of a user (role assignment): the engine replaces all process roles of the user with the sent ones
        if ((m = path.match(/^user\/([^/]+)\/role\/assign$/))) {
            const user = [PLAYGROUND_USER, ...OTHER_USERS].find(u => String(u.id) === m[1]);
            if (!user) {
                return ok({error: 'User not found'});
            }
            const index = new Map(ALL_NETS.flatMap(n => (n.roles ?? []).map(r => [processRole(n, r).stringId, processRole(n, r)] as [string, any])));
            index.set(PLAYGROUND_ROLE, PLAYGROUND_USER.processRoles[0]);
            user.processRoles = (Array.isArray(request.body) ? request.body : []).map(id => index.get(id) ?? {stringId: id, name: id, importId: id, description: ''});
            return ok({success: 'Roles assigned'});
        }
        if (path === 'user/search' || (path === 'user' && method === 'GET') || path === 'user/role') {
            const users = [PLAYGROUND_USER, ...OTHER_USERS];
            return ok(path === 'user/role' ? users : this.page('users', users, request));
        }
        if (path === 'user/preferences' || path === 'public/user/preferences') {
            return ok(method === 'GET' ? {locale: 'en-US', drawerWidth: 200, taskFilters: {}, caseFilters: {}, headers: {}} : {success: 'ok'});
        }

        // LDAP groups
        if (path === 'ldap/search') {
            const text = String(request.body?.fulltext ?? '').toLowerCase();
            const groups = LDAP_GROUPS.filter(g => !text || g.cn.toLowerCase().includes(text) || g.dn.toLowerCase().includes(text));
            return ok({
                ldapGroupResponseBodies: groups.map(g => ({
                    dn: g.dn, cn: g.cn, description: g.description,
                    processRoles: g.roleIds.map(id => ({stringId: id, name: id, importId: id, description: ''})),
                })),
            });
        }
        if (path === 'ldap/role/assign') {
            const group = LDAP_GROUPS.find(g => g.dn === request.body?.groupDn);
            if (!group) {
                return ok({error: 'LDAP group not found'});
            }
            group.roleIds = [...(request.body?.roleIds ?? [])];
            return ok({success: 'Roles assigned'});
        }

        // URI nodes of the dynamic navigation
        if (path === 'uri/root') {
            return ok(URI_NODES[0]);
        }
        if ((m = path.match(/^uri\/parent\/([^/]+)$/))) {
            return ok({_embedded: {uriNodes: URI_NODES.filter(n => n.parentId === m[1])}});
        }
        if ((m = path.match(/^uri\/level\/(\d+)$/))) {
            return ok({_embedded: {uriNodes: URI_NODES.filter(n => n.level === Number(m[1]))}});
        }
        if ((m = path.match(/^uri\/([^/]+)$/))) {
            const uriPath = this.decode(m[1]);
            const node = URI_NODES.find(n => n.uriPath === uriPath);
            return node ? ok(node) : {status: 404, body: {error: 'URI node not found'}};
        }

        // processes
        if (path === 'petrinet/search' || path === 'petrinet/search_elastic' || (path === 'petrinet' && method === 'GET')) {
            const nets = this.filterNets(request.body).map(n => this.netResource(n));
            return ok(path === 'petrinet' ? {_embedded: {petriNetReferences: nets}} : this.page('petriNetReferences', nets, request));
        }
        if (path === 'petrinet/transitions') {
            const ids = (request.params.get('ids') ?? '').split(',');
            const transitions = ALL_NETS.filter(n => ids.includes(n.stringId))
                .flatMap(n => n.transitions.map(t => ({stringId: t.id, title: t.title, petriNetId: n.stringId, immediateData: []})));
            return ok({_embedded: {transitionReferences: transitions}});
        }
        if ((m = path.match(/^petrinet\/([^/]+)\/transactions$/))) {
            return ok({_embedded: {transactions: []}});
        }
        if ((m = path.match(/^petrinet\/([^/]+)\/roles$/))) {
            // the playground role and the roles of the process (role assignment)
            const net = ALL_NETS.find(n => n.stringId === this.decode(m[1]) || n.stringId === m[1] || n.identifier === m[1]);
            return ok({
                processRoles: [{stringId: PLAYGROUND_ROLE, name: 'Playground user', importId: PLAYGROUND_ROLE, description: ''},
                    ...(net?.roles ?? []).map(r => processRole(net, r))],
                permissions: {[PLAYGROUND_ROLE]: {create: true, delete: true, view: true}},
            });
        }
        if ((m = path.match(/^petrinet\/([^/]+)\/([^/]+)$/)) && method === 'GET') {
            const identifier = this.decode(m[1]);
            const net = ALL_NETS.find(n => n.identifier === identifier || n.stringId === m[1]);
            return net ? ok(this.netResource(net)) : {status: 404, body: {error: 'Process not found'}};
        }
        if ((m = path.match(/^petrinet\/([^/]+)$/)) && method === 'GET') {
            const net = ALL_NETS.find(n => n.stringId === m[1]);
            return net ? ok(this.netResource(net)) : {status: 404, body: {error: 'Process not found'}};
        }
        if (path === 'petrinet/import') {
            return ok({error: 'The playground can not import processes (no engine)'});
        }

        // cases
        if (path === 'workflow/case/search' || path === 'workflow/case/search_mongo' || path === 'workflow/case/search_pfql') {
            return ok(this.page('cases', this.searchCases(request.body, path === 'workflow/case/search_pfql'), request));
        }
        if (path === 'workflow/case/count') {
            return ok({count: this.searchCases(request.body).length, entity: 'Case'});
        }
        if (path === 'workflow/case/' && method === 'POST') {
            const net = this.net(request.body?.netId);
            const state = this.createCaseState(net, request.body?.title || `${net.defaultCaseName || net.title} ${this._counter}`, request.body?.color);
            return ok({success: 'Case created', outcome: {aCase: this.caseResource(state), net: this.netResource(net), outcomes: []}});
        }
        if ((m = path.match(/^workflow\/case\/([^/]+)$/))) {
            const state = this._cases.find(c => c.stringId === m[1]);
            if (!state) {
                const raw = RAW_CASES.find(c => c.stringId === m[1]);
                return raw ? ok(raw) : {status: 404, body: {error: 'Case not found'}};
            }
            if (method === 'DELETE') {
                this._cases = this._cases.filter(c => c !== state);
                this._tasks = this._tasks.filter(t => t.caseId !== state.stringId);
                return ok({success: 'Case deleted', outcome: {aCase: this.caseResource(state), outcomes: []}});
            }
            return ok(this.caseResource(state));
        }

        // tasks
        if (path === 'task/search' || path === 'task/search_es' || path === 'task/search_pfql') {
            return ok(this.page('tasks', this.filterTasks(request.body).map(t => this.taskResource(t)), request));
        }
        if (path === 'task/count') {
            return ok({count: this.filterTasks(request.body).length, entity: 'Task'});
        }
        if ((m = path.match(/^task\/case\/([^/]+)$/))) {
            return ok(this._tasks.filter(t => t.caseId === m[1])
                .map(t => ({stringId: t.stringId, title: t.transition.title, transitionId: t.transition.id})));
        }
        if ((m = path.match(/^task\/(assign|cancel|finish)\/([^/]+)$/))) {
            return this.taskEvent(m[1], m[2]);
        }
        if ((m = path.match(/^task\/delegate\/([^/]+)$/))) {
            return this.taskEvent('delegate', m[1], String(request.body ?? ''));
        }
        if ((m = path.match(/^task\/([^/]+)\/data$/))) {
            if (m[1].startsWith(MENU_DATA_TASK_PREFIX)) {
                return ok(menuItemData(m[1]));
            }
            const task = this._tasks.find(t => t.stringId === m[1]);
            if (!task) {
                return {status: 404, body: {error: 'Task not found'}};
            }
            return method === 'GET' ? ok(this.getData(task)) : ok(this.setData(task, request.body));
        }

        // empty answers of endpoints the views call, but the playground has nothing for
        if (path === 'filter/search' || path === 'group/all' || path.startsWith('uri/') || path === 'dashboard/search') {
            return ok({content: [], _embedded: {}, page: {size: 0, totalElements: 0, totalPages: 0, number: 0}});
        }
        return undefined;
    }

    /* ------------------------------------------------------------ state */

    private net(netId: string): MockNet {
        return ALL_NETS.find(n => n.stringId === netId || n.identifier === netId) ?? NETS[0];
    }

    private createCaseState(net: MockNet, title: string, color?: string, id?: string): CaseState {
        const values: { [id: string]: any } = {};
        net.fields.forEach(f => values[f.id] = f.value);
        const state: CaseState = {
            stringId: id ?? `case-${this._counter++}`, net, title, color: color ?? 'panel-primary-icon', creationDate: new Date(), values,
        };
        this._cases.push(state);
        net.initialTransitions.forEach(id => this.enable(state, id));
        return state;
    }

    private enable(state: CaseState, transitionId: string): void {
        const transition = state.net.transitions.find(t => t.id === transitionId);
        if (transition) {
            // stable ids "<case>-<transition>" (task ref demo), a counter only when the transition is enabled again
            const id = `${state.stringId}-${transition.id}`;
            const stringId = this._tasks.some(t => t.stringId === id) ? `${id}-${this._counter++}` : id;
            this._tasks.push({stringId, caseId: state.stringId, transition});
        }
    }

    private finish(task: TaskState): void {
        const state = this._cases.find(c => c.stringId === task.caseId);
        this._tasks = this._tasks.filter(t => t !== task);
        if (state?.net.identifier === 'process' && task.transition.id === 'deploy') {
            // a deployed process opens read-only in the builder (it still reads the XML of the form task)
            state.values.state = 'deployed';
        }
        (state?.net.flow[task.transition.id] ?? []).forEach(id => this.enable(state, id));
    }

    private taskEvent(event: string, taskId: string, userId?: string): MockResponse {
        const task = this._tasks.find(t => t.stringId === taskId);
        if (!task) {
            return {status: 404, body: {error: 'Task not found'}};
        }
        switch (event) {
            case 'assign':
                task.user = PLAYGROUND_USER;
                task.startDate = new Date();
                break;
            case 'delegate': {
                // the body of the request is the id of the user the task is delegated to
                const user = [PLAYGROUND_USER, ...OTHER_USERS].find(u => String(u.id) === userId);
                if (!user) {
                    return {body: {error: 'User not found'}};
                }
                task.user = user as typeof PLAYGROUND_USER;
                task.startDate = new Date();
                break;
            }
            case 'cancel':
                task.user = undefined;
                task.startDate = undefined;
                break;
            case 'finish': {
                const missing = this.missingRequired(task);
                if (missing.length > 0) {
                    return {body: {error: `Fill in the required fields: ${missing.join(', ')}`}};
                }
                this.finish(task);
                break;
            }
        }
        const state = this._cases.find(c => c.stringId === task.caseId);
        return {
            body: {
                success: `Task ${task.transition.title} ${event === 'finish' ? 'finished' : event + 'ed'}`,
                outcome: {task: this.taskResource(task), aCase: state ? this.caseResource(state) : undefined, outcomes: []},
            },
        };
    }

    private missingRequired(task: TaskState): Array<string> {
        const state = this._cases.find(c => c.stringId === task.caseId);
        return task.transition.groups.flatMap(g => g.fields)
            .filter(ref => ref.behavior === 'required')
            .filter(ref => {
                const value = state?.values[ref.id];
                return value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
            })
            .map(ref => state.net.fields.find(f => f.id === ref.id)?.name ?? ref.id);
    }

    private getData(task: TaskState): any {
        const state = this._cases.find(c => c.stringId === task.caseId);
        let order = 0;
        const dataGroups = task.transition.groups.map(group => ({
            title: group.title,
            stretch: FORM_LAYOUT.stretch,
            alignment: FORM_LAYOUT.alignment,
            layout: {
                type: FORM_LAYOUT.type, cols: FORM_LAYOUT.cols, rows: Math.max(...group.fields.map(f => f.y)) + 1,
                compactDirection: FORM_LAYOUT.compactDirection, hideEmptyRows: FORM_LAYOUT.hideEmptyRows,
            },
            fields: {
                _embedded: {
                    fields: group.fields.map(ref => this.fieldResource(state, state.net.fields.find(f => f.id === ref.id), ref, order++)),
                },
            },
        }));
        return {outcome: {data: {_embedded: {dataGroups}}, task: this.taskResource(task), outcomes: []}};
    }

    private setData(task: TaskState, body: any): any {
        const state = this._cases.find(c => c.stringId === task.caseId);
        const changes = body?.[task.stringId] ?? body ?? {};
        Object.keys(changes).forEach(fieldId => {
            if (state && fieldId in state.values || state?.net.fields.some(f => f.id === fieldId)) {
                state.values[fieldId] = changes[fieldId]?.value;
            }
        });
        return {success: 'Data saved', outcome: {changedFields: {changedFields: {}}, task: this.taskResource(task), outcomes: []}};
    }

    /* ------------------------------------------------------------ filtering */

    /** ids, process identifiers and full text of a search body (object or array of objects, the libraries send both) */
    private criteria(body: any): {
        cases: Array<string>, processes: Array<string>, transitions: Array<string>, text?: string, user?: boolean,
        data: { [field: string]: any }, uriNodeId?: string
    } {
        const parts = Array.isArray(body) ? body : [body ?? {}];
        const list = (v: any) => (Array.isArray(v) ? v : v === undefined ? [] : [v]);
        const result = {cases: [], processes: [], transitions: [], text: undefined, user: undefined, data: {}, uriNodeId: undefined};
        parts.forEach(p => {
            list(p.stringId).forEach(id => result.cases.push(id));
            list(p.case).forEach(c => result.cases.push(typeof c === 'string' ? c : c.id ?? c.stringId));
            list(p.process).forEach(n => result.processes.push(typeof n === 'string' ? n : n.identifier));
            list(p.transitionId).forEach(t => result.transitions.push(t));
            if (p.fullText) {
                result.text = String(p.fullText).toLowerCase();
            }
            if (p.data) {
                Object.assign(result.data, p.data);
            }
            if (p.uriNodeId) {
                result.uriNodeId = p.uriNodeId;
            }
            if (p.user !== undefined) {
                result.user = true;
            }
        });
        return result;
    }

    private filterNets(body: any): Array<MockNet> {
        const c = this.criteria(body);
        const identifiers = [...c.processes, ...(Array.isArray(body?.identifier) ? body.identifier : body?.identifier ? [body.identifier] : [])];
        const nets = identifiers.length === 0 ? NETS : ALL_NETS.filter(n => identifiers.includes(n.identifier));
        // the title of the process search (fulltext of the workflow view)
        const title = typeof body?.title === 'string' ? body.title.trim().toLowerCase() : '';
        return title ? nets.filter(n => n.title.toLowerCase().includes(title)) : nets;
    }

    /** cases with tasks and the read-only navigation / dashboard cases, as engine resources */
    private searchCases(body: any, pfql = false): Array<any> {
        const c = this.criteria(body);
        const immediateValue = (resource: any, field: string) => resource.immediateData?.find(d => d.stringId === field)?.value;
        const query = (Array.isArray(body) ? body : [body ?? {}]).map(p => p.query).find(q => typeof q === 'string');
        // PFQL (advanced search) also on the count endpoint: recognized by its resource prefix
        pfql = pfql || /^\s*cases?\s*(:|\s+where\s)/i.test(query ?? '');
        // the configs of the user impersonate dialog: its Elasticsearch query is not evaluated, all configs are valid
        if (query && !pfql && !c.processes.includes('impersonation_config')) {
            return this.queryCases(query, immediateValue);
        }
        // advanced search: PFQL query (`cases: title contains 'x' and ...`) combined with the other criteria of the request
        const predicate = query && pfql ? this.pfqlPredicate(query) : undefined;
        return [...this._cases.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime()).map(s => this.caseResource(s)), ...RAW_CASES]
            .filter(r => c.cases.length === 0 || c.cases.includes(r.stringId))
            // menu items / dashboards only when asked for (by process or id), so they never show up in the case views
            .filter(r => c.processes.length === 0
                ? (c.cases.length > 0 || !RAW_CASES.includes(r))
                : c.processes.includes(r.processIdentifier))
            .filter(r => Object.entries(c.data).every(([field, value]) => immediateValue(r, field) === value))
            .filter(r => !c.text || r.title.toLowerCase().includes(c.text) || JSON.stringify(r.immediateData).toLowerCase().includes(c.text))
            .filter(r => !predicate || predicate(r));
    }

    /** predicate of a PFQL query over case resources, a query the playground does not understand matches nothing */
    private pfqlPredicate(query: string): (resource: any) => boolean {
        const access = (r: any, attribute: string) => {
            const data = attribute.match(/^data\.([^.]+)(?:\.(\w+))?$/i);
            if (data) {
                const state = this._cases.find(s => s.stringId === r.stringId);
                return state ? state.values[data[1]] : r.immediateData?.find(d => d.stringId === data[1])?.value;
            }
            switch (attribute.toLowerCase()) {
                case 'id':
                case 'stringid':
                    return r.stringId;
                case 'title':
                    return r.title;
                case 'processidentifier':
                    return r.processIdentifier;
                case 'processid':
                    return r.petriNetId;
                case 'author':
                    return r.author?.id ?? r.author?.email;
                case 'creationdate':
                    return r.creationDate;
                case 'visualid':
                    return r.visualId;
                default:
                    return r[attribute];
            }
        };
        const user = (attribute: string) => PLAYGROUND_USER[attribute.split('.')[1] ?? 'id'];
        try {
            return compilePfql(query, access, user) ?? (() => true);
        } catch (e) {
            console.warn(`[playground] PFQL query not supported: ${query}`, e);
            return () => false;
        }
    }

    /**
     * The Elastic query of the breadcrumbs: `(processIdentifier:menu_item AND dataSet.nodePath.textValue.keyword:"/a")
     * OR (stringId:"id")` – only the clauses the libraries send are understood.
     */
    private queryCases(query: string, immediateValue: (r: any, f: string) => any): Array<any> {
        const nodePaths = [...query.matchAll(/dataSet\.nodePath\.textValue\.keyword:"([^"]*)"/g)].map(m => m[1]);
        const ids = [...query.matchAll(/stringId:"([^"]*)"/g)].map(m => m[1]);
        return RAW_CASES.filter(r => ids.includes(r.stringId)
            || (r.processIdentifier === 'menu_item' && nodePaths.includes(immediateValue(r, 'nodePath'))));
    }

    private filterTasks(body: any): Array<TaskState> {
        const c = this.criteria(body);
        const ids = (Array.isArray(body) ? body : [body ?? {}]).flatMap(p => (Array.isArray(p.stringId) ? p.stringId : p.stringId ? [p.stringId] : []));
        return this._tasks
            .filter(t => ids.length === 0 || ids.includes(t.stringId))
            .filter(t => (c.cases.filter(id => !ids.includes(id))).length === 0 || c.cases.includes(t.caseId))
            .filter(t => c.processes.length === 0
                || c.processes.includes(this._cases.find(s => s.stringId === t.caseId)?.net.identifier))
            .filter(t => c.transitions.length === 0 || c.transitions.includes(t.transition.id))
            .filter(t => !c.text || t.transition.title.toLowerCase().includes(c.text)
                || (this._cases.find(s => s.stringId === t.caseId)?.title.toLowerCase().includes(c.text) ?? false));
    }

    private page(name: string, items: Array<any>, request: MockRequest): any {
        const size = Number(request.params.get('size') ?? 20);
        const number = Number(request.params.get('page') ?? 0);
        return {
            _embedded: {[name]: items.slice(number * size, (number + 1) * size)},
            page: {size, totalElements: items.length, totalPages: Math.ceil(items.length / size), number},
        };
    }

    /* ------------------------------------------------------------ resources */

    private netResource(net: MockNet): any {
        return {
            stringId: net.stringId, identifier: net.identifier, title: net.title, initials: net.initials, uriNodeId: 'root',
            version: '1.0.0', defaultCaseName: net.defaultCaseName, icon: net.icon,
            createdDate: [2026, 1, 15, 9, 0, 0], author: {email: PLAYGROUND_USER.email, fullName: PLAYGROUND_USER.fullName},
            immediateData: (net.immediate ?? []).map(id => {
                const field = net.fields.find(f => f.id === id);
                // the engine sends the title of a net immediate field already translated
                return {stringId: id, importId: id, title: field.name, type: field.type};
            }),
            deploymentState: 'DEPLOYED',
            permissions: {[PLAYGROUND_ROLE]: ALL_CASE_PERMISSIONS},
        };
    }

    private caseResource(state: CaseState): any {
        return {
            stringId: state.stringId, visualId: `${state.net.initials}-${state.stringId.split('-')[1]}`, title: state.title,
            color: state.color, icon: state.net.icon,
            processIdentifier: state.net.identifier, petriNetId: state.net.stringId,
            petriNetObjectId: {timestamp: 0, machineIdentifier: 0, processIdentifier: 0, counter: 0, timeSecond: 0, time: 0, date: 0},
            creationDate: this.engineDateTime(state.creationDate), lastModified: this.engineDateTime(state.creationDate),
            author: {id: PLAYGROUND_USER.id, email: PLAYGROUND_USER.email, fullName: PLAYGROUND_USER.fullName},
            immediateData: (state.net.immediate ?? []).map(id => {
                const field = state.net.fields.find(f => f.id === id);
                // options of the map fields as i18n strings, the case panel shows their labels
                const options = field.options ? Object.fromEntries(Object.entries(field.options)
                    .map(([key, label]) => [key, {defaultValue: label, translations: {}}])) : undefined;
                return {stringId: id, importId: id, title: {defaultValue: field.name, translations: {}}, type: field.type,
                    value: this.engineValue(field, state.values[id]), options};
            }),
            resetArcTokens: {},
            permissions: {[PLAYGROUND_ROLE]: ALL_CASE_PERMISSIONS}, users: {}, userRefs: {},
            tasks: this._tasks.filter(t => t.caseId === state.stringId).map(t => ({task: t.stringId, transition: t.transition.id})),
        };
    }

    private taskResource(task: TaskState): any {
        const state = this._cases.find(c => c.stringId === task.caseId);
        return {
            stringId: task.stringId, caseId: task.caseId, transitionId: task.transition.id, title: task.transition.title,
            icon: task.transition.icon, caseTitle: state?.title, caseColor: state?.color, processId: state?.net.identifier,
            user: task.user ? {id: task.user.id, email: task.user.email, name: task.user.name, surname: task.user.surname,
                fullName: task.user.fullName} : undefined,
            startDate: task.startDate ? this.engineDateTime(task.startDate) : undefined, finishDate: undefined,
            roles: {[PLAYGROUND_ROLE]: ALL_TASK_PERMISSIONS}, users: {}, userRefs: {},
            assignPolicy: 'MANUAL', dataFocusPolicy: 'MANUAL', finishPolicy: 'MANUAL',
            layout: {cols: FORM_LAYOUT.cols, rows: 0, offset: 0, fieldAlignment: FORM_LAYOUT.fieldAlignment,
                type: FORM_LAYOUT.type, compactDirection: FORM_LAYOUT.compactDirection, hideEmptyRows: FORM_LAYOUT.hideEmptyRows},
            dataGroups: [], immediateData: [], priority: 1, _links: {},
        };
    }

    private fieldResource(state: CaseState, field: MockField, ref: { behavior: string, x: number, y: number, cols?: number }, order: number): any {
        const behavior = ref.behavior === 'required' ? {editable: true, required: true} : {[ref.behavior]: true};
        return {
            stringId: field.id, type: field.type, name: field.name, description: field.description, placeholder: field.placeholder,
            behavior, order, component: field.component,
            layout: {x: ref.x, y: ref.y, rows: 1, cols: ref.cols ?? 2, offset: 0, template: FORM_LAYOUT.template,
                appearance: 'outline'},
            options: field.options, choices: [], validations: [],
            value: this.engineValue(field, state.values[field.id]),
        };
    }

    /** case values are kept as the client sends them, dates are converted to the engine's array format */
    private engineValue(field: MockField, value: any): any {
        if (value === undefined || value === null || value === '') {
            return field.type === 'date' || field.type === 'dateTime' ? undefined : value;
        }
        if (field.type === 'date' || field.type === 'dateTime') {
            const d = new Date(value);
            return isNaN(d.getTime()) ? undefined : field.type === 'date'
                ? [d.getFullYear(), d.getMonth() + 1, d.getDate()]
                : this.engineDateTime(d);
        }
        return value;
    }

    private engineDateTime(d: Date): Array<number> {
        return [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
    }

    private decode(value: string): string {
        try {
            return atob(value);
        } catch {
            return value;
        }
    }
}
