import {SortableView} from './sortable-view';
import {Observable, ReplaySubject} from 'rxjs';
import {Net} from '../../process/net';

export abstract class SortableViewWithAllowedNets extends SortableView {

    protected _allowedNets$: ReplaySubject<Array<Net>>;

    protected constructor(allowedNets: Observable<Array<Net>>) {
        super();
        this._allowedNets$ = new ReplaySubject<Array<Net>>(1);
        allowedNets.subscribe(nets => {
            this._allowedNets$.next(nets);
        });
    }

    public get allowedNets$(): Observable<Array<Net>> {
        return this._allowedNets$.asObservable();
    }
}
