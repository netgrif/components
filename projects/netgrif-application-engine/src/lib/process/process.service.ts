import {Injectable, OnDestroy} from '@angular/core';
import {forkJoin, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {Net} from './net';
import {PetriNetResourceService} from '../resources/engine-endpoint/petri-net-resource.service';
import {LoggerService} from '../logger/services/logger.service';
import Transition from './transition';
import Transaction from './transaction';
import {catchError, map, tap} from 'rxjs/operators';
import RolesAndPermissions from './rolesAndPermissions';
import {PetriNetReference} from '../resources/interface/petri-net-reference';

export interface NetCache {
    [k: string]: NetCacheContent;
}

export interface NetCacheContent {
    /**
     * Whether the net is fully loaded, or only the {@link PetriNetReference} has been loaded.
     */
    full: boolean;
    net: Net;
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
    protected _referenceRequestCache: Map<string, ReplaySubject<PetriNetReference>>;

    constructor(private _petriNetResource: PetriNetResourceService, private _log: LoggerService) {
        this._nets = {};
        this._netsSubject = new Subject<NetCache>();
        this._netUpdate = new Subject<Net>();
        this._requestCache = new Map<string, ReplaySubject<Net>>();
        this._referenceRequestCache = new Map<string, ReplaySubject<PetriNetReference>>();
    }

    ngOnDestroy(): void {
        this._netsSubject.complete();
        this._netUpdate.complete();
        Array.from(this._requestCache.values()).forEach(net => net.complete());
        Array.from(this._referenceRequestCache.values()).forEach(net => net.complete());
    }

    /**
     * Get process nets according to provided identifiers.
     * If any of the requested processes is not loaded it will be loaded from a server and saved for later.
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
        if (!forceLoad && this._nets[identifier]?.full) {
            return of(this._nets[identifier].net);
        }
        if (this._requestCache.has(identifier)) {
            return this._requestCache.get(identifier).asObservable();
        }

        this._requestCache.set(identifier, new ReplaySubject<Net>(1));
        let net$: Observable<Net>;
        if (this._nets[identifier] && !this._nets[identifier].full) {
            net$ = this.updateNet(this._nets[identifier].net);
        } else {
            net$ = this.loadNet(identifier);
        }
        return net$.pipe(
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
     * Get process net references according to provided identifiers.
     *
     * If any of the requested processes is not loaded it will be loaded from a server and saved for later.
     *
     * This method does not return the fully populated {@link Net} objects, but needs only one backend request to produce the result.
     * If you need the full {@link Net} objects use [getNets()]{@link ProcessService#getNets} instead.
     * @param identifiers Array of identifiers of requested processes. See [Net]{@link Net}
     * @param forceLoad when set to `true` cached processes will be ignored and a backend request will always be made
     * (unless another is already pending)
     * @returns Observable of array of loaded processes. Array is emitted only when every process finished loading.
     * If any of the processes failed to load it is skipped from the result.
     */
    public getNetReferences(identifiers: Array<string>, forceLoad = false): Observable<Array<PetriNetReference>> {
        if (identifiers.length === 0) {
            return of([]);
        }
        return forkJoin(identifiers.map(i => {
            return this.getNetReference(i, forceLoad);
        })).pipe(
            map(references => references.filter(r => !!r))
        );
    }

    /**
     * Get process net reference by identifier.
     *
     * This method does not return the fully populated {@link Net} object, but needs only one backend request to produce the result.
     * If you need the full {@link Net} object use [getNet()]{@link ProcessService#getNet} instead.
     * @param identifier Identifier of the requested process. See [Net]{@link Net}
     * @param forceLoad when set to `true` cached processes will be ignored and a backend request will always be made
     * (unless another is already pending)
     * @returns Observable of [the process reference]{@link PetriNetReference}. Process is loaded from a server or picked from the cache.
     * If a fully loaded net is already cached, the fully loaded net will be returned.
     */
    public getNetReference(identifier: string, forceLoad = false): Observable<PetriNetReference> {
        if (!forceLoad && this._nets[identifier]) {
            return of(this._nets[identifier].net);
        }
        if (this._requestCache.has(identifier)) {
            return this._requestCache.get(identifier).asObservable();
        }
        if (this._referenceRequestCache.has(identifier)) {
            return this._referenceRequestCache.get(identifier).asObservable();
        }
        this._referenceRequestCache.set(identifier, new ReplaySubject<PetriNetReference>(1));
        return this.loadNetReference(identifier).pipe(
            tap(reference => {
                const s = this._referenceRequestCache.get(identifier);
                if (s) {
                    s.next(reference);
                    s.complete();
                    this._referenceRequestCache.delete(identifier);
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
        this.loadNetReference(id).subscribe(reference => {
            if (reference === null) {
                returnNet.next(null);
                returnNet.complete();
                return;
            }
            this.updateNet(new Net(reference)).subscribe(net => {
                returnNet.next(net);
                returnNet.complete();
            });
        });
        return returnNet.asObservable();
    }

    protected loadNetReference(id: string): Observable<PetriNetReference> {
        const returnReference = new Subject<PetriNetReference>();
        this._petriNetResource.getOne(id, '^').subscribe(reference => {
            if (!reference.stringId) {
                returnReference.next(null);
                returnReference.complete();
                return;
            }
            this._nets[reference.identifier] = {full: false, net: new Net(reference)};
            returnReference.next(this._nets[reference.identifier].net);
            returnReference.complete();
        }, error => {
            this._log.error('Failed to load Petri net', error);
            returnReference.next(null);
            returnReference.complete();
        });
        return returnReference.asObservable();
    }

    /**
     * Update cached process object. If the process is not found nothing happens. Process object is replaced.
     * @param net Updated process object.
     */
    public updateNet(net: Net): Observable<Net> {
        const returnNet = new Subject<Net>();
        if (!this._nets[net.identifier]) {
            returnNet.complete();
            return returnNet;
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
                this._nets[net.identifier] = {full: true, net};
                this.publishUpdate(net);
            }, error => {
                this._log.error('Failed to load part of Petri net ' + net.title, error);
                returnNet.next(net);
                returnNet.complete();
            });
        } else {
            this._nets[net.identifier] = {full: true, net};
            this.publishUpdate(net);
            returnNet.next(net);
            returnNet.complete();
        }
        return returnNet;
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
