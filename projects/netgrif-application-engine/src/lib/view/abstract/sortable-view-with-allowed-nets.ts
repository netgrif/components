import {SortableView} from './sortable-view';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {Net} from '../../process/net';
import {OnDestroy} from '@angular/core';

export abstract class SortableViewWithAllowedNets extends SortableView implements  OnDestroy {

    protected _allowedNets$: ReplaySubject<Array<Net>>;
    private  subAllowedNets: Subscription;

    protected constructor(allowedNets: Observable<Array<Net>>) {
        super();
        this._allowedNets$ = new ReplaySubject<Array<Net>>(1);
        this.subAllowedNets = allowedNets.subscribe(nets => {
            this._allowedNets$.next(nets);
        });
    }

    public get allowedNets$(): Observable<Array<Net>> {
        return this._allowedNets$.asObservable();
    }

    ngOnDestroy(): void {
        this._allowedNets$.complete();
        this.subAllowedNets.unsubscribe();
    }
}
