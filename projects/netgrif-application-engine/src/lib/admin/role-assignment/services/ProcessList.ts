import {LoadingEmitter} from '../../../utility/loading-emitter';
import {PetriNetReference} from '../../../resources/interface/petri-net-reference';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {forkJoin, Observable, of, timer} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import NetRole from '../../../process/netRole';
import RolesAndPermissions from '../../../process/rolesAndPermissions';

export interface ExtendedProcessRole extends NetRole {
    selected: boolean;
    processIdentifier: string;

    toggle(): void;
}

export interface ProcessVersion extends PetriNetReference {
    roles: Array<ExtendedProcessRole>;
}

export interface ProcessListItem {
    identifier: string;
    title: string;
    initials: string;
    newestVersion: string;
    processes: Array<ProcessVersion>;
    loading: boolean;
    emptyRoles: boolean;
    someRolesSelected: boolean;
}

export class ProcessList {
    private _loading$: LoadingEmitter;
    private _processes: Array<ProcessListItem>;
    private readonly _rolesIndex: { [k: string]: Array<ExtendedProcessRole> };
    private _selectedRoles: Set<string>;

    constructor(private _resources: PetriNetResourceService, private _log: LoggerService) {
        this._loading$ = new LoadingEmitter();
        this._processes = [];
        this._rolesIndex = {};
        this._selectedRoles = new Set<string>();
    }

    public get loading(): boolean {
        return this._loading$.getValue();
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public get processes(): Array<ProcessListItem> {
        return this._processes;
    }

    public get selectedRoles(): Array<string> {
        return [...this._selectedRoles];
    }

    public loadProcesses(): void {
        if (this.loading) {
            return;
        }
        this._loading$.on();
        this._resources.getAll().pipe(
            catchError(err => {
                this._log.error('Failed to load Petri nets', err);
                return of([] as Array<ProcessVersion>);
            }),
            map(p => Array.isArray(p) ? p : [] as Array<ProcessVersion>),
            map(ps => ps.map(p => ({
                ...p,
                roles: []
            }) as ProcessVersion))
        ).subscribe(nets => {
            const cache: { [k: string]: ProcessListItem } = {};
            nets.forEach(net => {
                if (cache[net.identifier]) {
                    cache[net.identifier].processes.push(net);
                } else {
                    cache[net.identifier] = {
                        identifier: net.identifier,
                        title: net.title,
                        initials: net.initials,
                        newestVersion: undefined,
                        processes: [net],
                        loading: true,
                        emptyRoles: true,
                        someRolesSelected: false
                    };
                }
                cache[net.identifier].processes.sort((a, b) => {
                    return b.version.localeCompare(a.version, undefined, { numeric: true });
                });
                cache[net.identifier].newestVersion = cache[net.identifier].processes[0].version;
            });
            this._processes = Object.values(cache).sort();
            this._loading$.off();
        });
    }

    public prepareToTryAgainToLoadRoles(item: ProcessListItem): void {
        if (!item || !item.emptyRoles) {
            return;
        }
        item.loading = true;
    }

    public selectRoles(roleIds: Set<string>): void {
        if (!roleIds) {
            roleIds = new Set<string>([]);
        }
        roleIds.forEach(role => {
            this._selectedRoles.delete(role);
        });
        this._selectedRoles.forEach(role => {
            if (this._rolesIndex[role]) {
                this._rolesIndex[role].forEach(r => r.selected = false);
            }
        });
        this._selectedRoles = roleIds;
        this._selectedRoles.forEach(role => {
            if (this._rolesIndex[role]) {
                this._rolesIndex[role].forEach(r => r.selected = true);
            }
        });
        this.updateSelectedRolesFlag(Object.keys(this._rolesIndex)
            .filter(r => this._selectedRoles.has(r))
            .map(r => this._rolesIndex[r].length !== 0 ? this._rolesIndex[r][0].processIdentifier : null));
    }

    public updateSelectedRoles(role: ExtendedProcessRole): void {
        role.selected ? this._selectedRoles.add(role.stringId) : this._selectedRoles.delete(role.stringId);
        this._rolesIndex[role.stringId].forEach(r => r.selected = role.selected);
    }

    public loadProcessItemRoles(item: ProcessListItem): void {
        if (!item || !item.emptyRoles) {
            return;
        }
        item.loading = true;
        forkJoin(item.processes.map(p => this.loadNetRoles(p))).subscribe(roles => {
            let isEmpty = true;
            roles.forEach((rs, i) => {
                item.processes[i].roles = rs;
                isEmpty = isEmpty && rs.length === 0;
            });
            item.emptyRoles = isEmpty;
            item.loading = false;
        });
    }

    private loadNetRoles(net: ProcessVersion): Observable<Array<ExtendedProcessRole>> {
        if (net.roles && net.roles.length !== 0) {
            return of(net.roles);
        }
        return this._resources.getPetriNetRoles(net.stringId).pipe(
            catchError(err => {
                this._log.error('Failed to load roles for Petri net [' + net.stringId + '] ' + net.title, err);
                return of([] as Array<ExtendedProcessRole>);
            }),
            map((roles: RolesAndPermissions) => roles.processRoles.map(role => ({
                ...role,
                selected: false,
                processIdentifier: net.identifier,
                toggle() {
                    this.selected = !this.selected;
                }
            }) as ExtendedProcessRole)),
            tap(roles => roles.forEach(role => {
                if (!this._rolesIndex[role.stringId]) {
                    this._rolesIndex[role.stringId] = [role];
                } else {
                    this._rolesIndex[role.stringId].push(role);
                }
                if (this._selectedRoles.has(role.stringId)) {
                    role.selected = true;
                }
            }))
        );
    }

    private updateSelectedRolesFlag(identifiers: Array<string>): void {
        if (!identifiers) {
            return;
        }
        timer(0).subscribe(_ => {
            if (identifiers.length === 0) {
                this._processes.forEach(process => {
                    process.someRolesSelected = false;
                });
            }
            identifiers.forEach(identifier => {
                if (!identifier) {
                    return;
                }
                const requested = this._processes.find(process => process.identifier === identifier);
                if (requested) {
                    requested.someRolesSelected = requested.processes.some(version => version.roles.length !== 0);
                }
            });
            this._processes.forEach(process => {
                if (!identifiers.find(i => process.identifier === i)) {
                    process.someRolesSelected = false;
                }
            });
        });
    }
}
