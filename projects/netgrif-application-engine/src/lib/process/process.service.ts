import {Injectable, OnDestroy} from '@angular/core';
import {forkJoin, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {Net} from './net';
import {PetriNetResourceService} from '../resources/engine-endpoint/petri-net-resource.service';
import {LoggerService} from '../logger/services/logger.service';
import Transition from './transition';
import Transaction from './transaction';
import {catchError, map, tap} from 'rxjs/operators';
import RolesAndPermissions from './rolesAndPermissions';

export interface NetCache {
    [k: string]: Net;
}

/**
 * Process service is responsible for loading and caching processes needed for any functionality of an app.
 */
@Injectable({
    providedIn: 'root'
})
export class ProcessService implements OnDestroy {

    protected readonly _nets: NetCache;
    protected _netsSubject: Subject<NetCache>;
    protected _netUpdate: Subject<Net>;
    protected _requestCache: Map<string, ReplaySubject<Net>>;

    constructor(private _petriNetResource: PetriNetResourceService, private _log: LoggerService) {
        this._nets = {};
        this._netsSubject = new Subject<NetCache>();
        this._netUpdate = new Subject<Net>();
        this._requestCache = new Map<string, ReplaySubject<Net>>();
    }

    ngOnDestroy(): void {
        this._netsSubject.complete();
        this._netUpdate.complete();
        Array.from(this._requestCache.values()).forEach(net => net.complete());
    }

    /**
     * Get process nets according to provided identifiers.
     * If any of the requested processes is not loaded it will be loaded from a server and save for later.
     * @param identifiers Array of identifiers of requested processes. See [Net]{@link Net}
     * @param forceLoad when set to `true` cached processes will be ignored and a backend request will always be made
     * (unless another is already pending)
     * @returns Observable of array of loaded processes. Array is emitted only when every process finished loading.
     * If any of the processes failed to load it is skipped from the result.
     */
    public getNets(identifiers: Array<string>, forceLoad = false): Observable<Array<Net>> {
        if (identifiers.length === 0) {
            return of([]);
        }
        return forkJoin(identifiers.map(i => {
            return this.getNet(i, forceLoad);
        })).pipe(
            map(nets => nets.filter(n => !!n)),
            tap(nets => {
                if (nets.length === 0) {
                    return;
                }
                this._netsSubject.next(this._nets);
                nets.forEach(n => this._netUpdate.next(n));
            })
        );
    }

    /**
     * Get process net by identifier.
     * @param identifier Identifier of the requested process. See [Net]{@link Net}
     * @param forceLoad when set to `true` cached processes will be ignored and a backend request will always be made
     * (unless another is already pending)
     * @returns Observable of [the process]{@link Net}. Process is loaded from a server or picked from the cache.
     */
    public getNet(identifier: string, forceLoad = false): Observable<Net> {
        if (!forceLoad && this._nets[identifier]) {
            return of(this._nets[identifier]);
        }
        if (this._requestCache.has(identifier)) {
            return this._requestCache.get(identifier).asObservable();
        }
        this._requestCache.set(identifier, new ReplaySubject<Net>(1));
        return this.loadNet(identifier).pipe(
            tap(net => {
                const s = this._requestCache.get(identifier);
                if (s) {
                    s.next(net);
                    s.complete();
                    this._requestCache.delete(identifier);
                }
                if (net) {
                    this.publishUpdate(net);
                }
            })
        );
    }

    /**
     * Remove cached process by identifier. If the process is not found nothing happens.
     * @param identifier Process identifier
     */
    public removeNet(identifier: string): void {
        if (!this._nets[identifier]) {
            return;
        }
        delete this._nets[identifier];
        this.publishUpdate();
    }

    /**
     * Update cached process object. If the process is not found nothing happens. Process object is replaced.
     * @param net Updated process object.
     */
    public updateNet(net: Net): void {
        if (!this._nets[net.identifier]) {
            return;
        }
        if (!net.transitions.length || !net.transactions.length || !net.roles.length) {
            forkJoin({
                transitions: this.loadTransitions(net.stringId),
                transactions: this.loadTransactions(net.stringId),
                roles: this.loadRoles(net.stringId)
            }).subscribe(values => {
                net.transitions = values.transitions;
                net.transactions = values.transactions;
                net.roles = values.roles.processRoles;
                net.permissions = values.roles.permissions;
                this._nets[net.identifier] = net;
                this.publishUpdate(net);
            }, error => {
                this._log.error('Failed to load part of Petri net ' + net.title, error);
                // throw error;
            });
        } else {
            this._nets[net.identifier] = net;
            this.publishUpdate(net);
        }
    }

    /**
     * Stream of change of the process cache.
     * New state of cache is emitted every time the cached changed by inserting, updating or deleting a process.
     * @returns Observable of whole updated cache.
     */
    public get nets$(): Observable<NetCache> {
        return this._netsSubject.asObservable();
    }

    /**
     * Stream of change in the process cache.
     * New state of cache is emitted every time the cached changed by inserting, updating or deleting a process.
     * @returns Observable of updated or newly loaded process net.
     */
    public get netUpdate$(): Observable<Net> {
        return this._netUpdate.asObservable();
    }

    public areNetsLoaded(identifiers: Array<string>): boolean {
        return identifiers.every(identifier => this.isNetLoaded(identifier));
    }

    public isNetLoaded(identifier: string): boolean {
        return !!this._nets[identifier];
    }

    protected loadNet(id: string): Observable<Net> {
        const returnNet = new Subject<Net>();
        this._petriNetResource.getOne(id, '^').subscribe(net => {
            if (!net.stringId) {
                returnNet.next(null);
                returnNet.complete();
                return;
            }
            forkJoin({
                transitions: this.loadTransitions(net.stringId),
                transactions: this.loadTransactions(net.stringId),
                roles: this.loadRoles(net.stringId)
            }).subscribe(values => {
                this._nets[net.identifier] = new Net(net);
                this._nets[net.identifier].transitions = values.transitions;
                this._nets[net.identifier].transactions = values.transactions;
                this._nets[net.identifier].roles = values.roles.processRoles;
                this._nets[net.identifier].permissions = values.roles.permissions;
                returnNet.next(this._nets[net.identifier]);
                returnNet.complete();
            }, error => {
                this._log.error('Failed to load part of Petri net ' + net.title, error);
                returnNet.next(this._nets[net.identifier]);
                returnNet.complete();
                // throw error;
            });
        }, error => {
            this._log.error('Failed to load Petri nets', error);
            returnNet.next(null);
            returnNet.complete();
            // throw error;
        });
        return returnNet.asObservable();
    }

    protected loadTransitions(id: string): Observable<Array<Transition>> {
        return this._petriNetResource.getPetriNetTranstions(id).pipe(
            map(trans => {
                if (trans instanceof Array) {
                    return trans;
                }
                return [];
            }),
            tap(trans => {
                if (trans.length === 0) {
                    this._log.info('References for transitions of net ' + id + ' were not found!');
                }
            }),
            catchError(err => {
                this._log.error('References for transitions of net ' + id + ' failed to load!', err);
                throw err;
            })
        );
    }

    protected loadTransactions(id: string): Observable<Array<Transaction>> {
        return this._petriNetResource.getPetriNetTransactions(id).pipe(
            map(trans => {
                if (trans instanceof Array) {
                    return trans;
                }
                return [];
            }),
            tap(trans => {
                if (trans.length === 0) {
                    this._log.info('References for transactions of net ' + id + ' were not found!');
                }
            }),
            catchError(err => {
                this._log.error('References for transactions of net ' + id + ' failed to load!', err);
                throw err;
            })
        );
    }

    protected loadRoles(id: string): Observable<RolesAndPermissions> {
        return this._petriNetResource.getPetriNetRoles(id).pipe(
            tap(rolesAndPerm => {
                if (rolesAndPerm.processRoles.length === 0) {
                    this._log.info('Roles reference of net ' + id + ' were not found!');
                }
            }),
            catchError(err => {
                this._log.error('Roles reference of net ' + id + ' failed to load!', err);
                throw err;
            })
        );
    }

    protected publishUpdate(net?: Net): void {
        this._netsSubject.next(this._nets);
        if (net) {
            this._netUpdate.next(net);
        }
    }
}
