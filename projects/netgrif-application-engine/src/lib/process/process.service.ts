import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Net} from './net';
import {PetriNetResourceService} from '../resources/engine-endpoint/petri-net-resource-service';
import {LoggerService} from '../logger/services/logger.service';
import Transition from './transition';
import Transaction from './transaction';
import NetRole from './netRole';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProcessService {

    private _nets: {};

    constructor(private _petriNetResource: PetriNetResourceService, private _log: LoggerService) {
        this._nets = {};
    }

    public getNet(identifier: string): Observable<Net> {
        if (this._nets[identifier] !== undefined) {
            return of(this._nets[identifier]);
        }

        const returnNet = new Subject<Net>();
        this._petriNetResource.getOne(identifier, '^').pipe(
            map(net => new Net(net)),
            tap(net => {
                this.loadTransitions(net.stringId).subscribe( trans => {
                    net.transitions = trans;
                    this.loadTransactions(net.stringId).subscribe( transactions => {
                        net.transactions = transactions;
                        this.loadRoles(net.stringId).subscribe( roles => {
                            net.roles = roles;
                            returnNet.next(net);
                            this._nets[identifier] = net;
                        });
                    });
                });
            }),
            catchError(err => {
                this._log.error('Failed to load Petri nets', err);
                throw err;
            })
        ).subscribe();

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
}
