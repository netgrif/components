import {Injectable} from '@angular/core';
import {forkJoin, Observable, of, Subject} from 'rxjs';
import {Net} from './net';
import {PetriNetResourceService} from '../resources/engine-endpoint/petri-net-resource.service';
import {LoggerService} from '../logger/services/logger.service';
import Transition from './transition';
import Transaction from './transaction';
import NetRole from './netRole';
import {catchError, map, tap} from 'rxjs/operators';

export interface NetCache {
    [k: string]: Net;
}

@Injectable({
    providedIn: 'root'
})
export class ProcessService {

    private readonly _nets: NetCache;
    private _netsSubject: Subject<NetCache>;
    private _netUpdate: Subject<Net>;

    constructor(private _petriNetResource: PetriNetResourceService, private _log: LoggerService) {
        this._nets = {};
        this._netsSubject = new Subject<NetCache>();
        this._netUpdate = new Subject<Net>();
    }

    public getNets(identifiers: Array<string>): Observable<Array<Net>> {
        return forkJoin(identifiers.map(i => this.loadNet(i))).pipe(
            tap(nets => {
                this._netsSubject.next(this._nets);
                nets.forEach(n => this._netUpdate.next(n));
            })
        );
    }

    public getNet(identifier: string): Observable<Net> {
        if (this._nets[identifier]) {
            return of(this._nets[identifier]);
        }

        return this.loadNet(identifier).pipe(
            tap(net => this.publishUpdate(net))
        );
    }

    public removeNet(identifier: string): void {
        if (!this._nets[identifier]) {
            return;
        }
        delete this._nets[identifier];
        this.publishUpdate();
    }

    public updateNet(net: Net): void {
        if (!this._nets[net.identifier]) {
            return;
        }
        this._nets[net.identifier] = net;
        this.publishUpdate(net);
    }

    public get nets$(): Observable<NetCache> {
        return this._netsSubject.asObservable();
    }

    public get netUpdate$(): Observable<Net> {
        return this._netUpdate.asObservable();
    }

    private loadNet(id: string): Observable<Net> {
        const returnNet = new Subject<Net>();
        this._petriNetResource.getOne(id, '^').pipe(
            map(n => new Net(n))
        ).subscribe(net => {
            this._nets[net.identifier] = net;
            forkJoin({
                transitions: this.loadTransitions(net.stringId),
                transactions: this.loadTransactions(net.stringId),
                roles: this.loadRoles(net.stringId)
            }).subscribe(values => {
                this._nets[net.identifier].transitions = values.transitions;
                this._nets[net.identifier].transactions = values.transactions;
                this._nets[net.identifier].roles = values.roles;
                returnNet.next(this._nets[net.identifier]);
            }, error => {
                this._log.error('Failed to load part of Petri net ' + net.title, error);
                throw error;
            });
        }, error => {
            this._log.error('Failed to load Petri nets', error);
            throw error;
        });

        return returnNet.asObservable();
    }

    private loadTransitions(id: string): Observable<Array<Transition>> {
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

    private loadTransactions(id: string): Observable<Array<Transaction>> {
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

    private loadRoles(id: string): Observable<Array<NetRole>> {
        return this._petriNetResource.getPetriNetRoles(id).pipe(
            map(roles => {
                if (roles instanceof Array) {
                    return roles;
                }
                return [];
            }),
            tap(roles => {
                if (roles.length === 0) {
                    this._log.info('Roles reference of net ' + id + ' were not found!');
                }
            }),
            catchError(err => {
                this._log.error('Roles reference of net ' + id + ' failed to load!', err);
                throw err;
            })
        );
    }

    private publishUpdate(net?: Net): void {
        this._netsSubject.next(this._nets);
        if (net) {
            this._netUpdate.next(net);
        }
    }
}
