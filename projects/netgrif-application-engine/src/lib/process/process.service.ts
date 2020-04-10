import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
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

    private _nets: BehaviorSubject<Array<Net>>;

    constructor(private _petriNetResource: PetriNetResourceService, private _log: LoggerService) {
        this._nets = new BehaviorSubject<Array<Net>>([]);
    }

    loadNets(force = false): Observable<Array<Net>> {
        if (!force && this._nets.getValue().length > 0) {
            return this._nets.asObservable();
        }

        return this._petriNetResource.getAll().pipe(
            map( nets => {
                if (nets instanceof Array) {
                    return nets.map( net => new Net(net));
                }
                return [];
            }),
            tap(nets => {
                nets.forEach( net => {
                    this.loadTransitions(net.stringId).subscribe(trans => net.transitions = trans);
                    this.loadTransactions(net.stringId).subscribe(trans => net.transactions = trans);
                    this.loadRoles(net.stringId).subscribe(roles => net.roles = roles);
                });
                this._nets.next(nets);
                return of(nets);
            }, error => {
                this._log.error('Failed to parse Petri net resources');
                this._log.info(error);
                return throwError(error);
            }),
            catchError(err => {
                this._log.error('Failed to load Petri nets');
                this._log.info(err);
                return throwError(err);
            })
        );
    }

    private loadTransitions(id: string): Observable<Array<Transition>> {
        return this._petriNetResource.getPetriNetTranstions(id).pipe(
            map(trans => trans),
            tap( trans => {
                if (trans.length === 0) {
                    this._log.info('References for transitions of net ' + id + ' were not found!');
                }
                return of(trans);
            }),
            catchError(err => {
                this._log.error('References for transitions of net ' + id + ' failed to load!');
                this._log.info(err);
                return throwError(err);
            })
        );
    }

    private loadTransactions(id: string): Observable<Array<Transaction>> {
        return this._petriNetResource.getPetriNetTransactions(id).pipe(
            map(trans => trans),
            tap( trans => {
                if (trans.length === 0) {
                    this._log.info('References for transactions of net ' + id + ' were not found!');
                }
                return of(trans);
            }),
            catchError(err => {
                this._log.error('References for transactions of net ' + id + ' failed to load!');
                this._log.info(err);
                return throwError(err);
            })
        );
    }

    private loadRoles(id: string): Observable<Array<NetRole>> {
        return this._petriNetResource.getPetriNetRoles(id).pipe(
            map(roles => roles),
            tap( trans => {
                if (trans.length === 0) {
                    this._log.info('Roles reference of net ' + id + ' were not found!');
                }
                return of(trans);
            }),
            catchError(err => {
                this._log.error('Roles reference of net ' + id + ' failed to load!');
                this._log.info(err);
                return throwError(err);
            })
        );
    }
}
