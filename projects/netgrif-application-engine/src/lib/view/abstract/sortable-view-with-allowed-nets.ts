import {SortableView} from './sortable-view';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {Net} from '../../process/net';
import {OnDestroy} from '@angular/core';

export abstract class SortableViewWithAllowedNets extends SortableView implements  OnDestroy {

    protected _allowedNets$: ReplaySubject<Array<Net>>;
    private subAllowedNets: Subscription;
    protected _allowedNetsCount: number;

    protected constructor(allowedNets: Observable<Array<Net>>) {
        super();
        this._allowedNets$ = new ReplaySubject<Array<Net>>(1);
        this.subAllowedNets = allowedNets.subscribe(nets => {
            this._allowedNets$.next(nets);
            this._allowedNetsCount = nets.length;
        });
    }

    public get allowedNets$(): Observable<Array<Net>> {
        return this._allowedNets$.asObservable();
    }

    public get allowedNetsCount(): number {
        return this._allowedNetsCount;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._allowedNets$.complete();
        this.subAllowedNets.unsubscribe();
    }
}
