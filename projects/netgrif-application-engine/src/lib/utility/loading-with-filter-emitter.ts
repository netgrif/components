import {BehaviorSubject, from} from 'rxjs';
import {Filter} from '../filter/models/filter';
import {reduce} from 'rxjs/operators';

export class LoadingWithFilterEmitter extends BehaviorSubject<boolean> {

    private _loadingStates: Map<Filter, boolean>;

    constructor(initial = false) {
        super(initial);
        this._loadingStates = new Map<Filter, boolean>();
    }

    public get isActive(): boolean {
        return this.getValue();
    }

    public isActiveWithFilter(withFilter: Filter): boolean {
        return !!this._loadingStates.get(withFilter);
    }

    public on(withFilter: Filter) {
        this.nextValue(withFilter, true);
    }

    public off(withFilter: Filter) {
        this.nextValue(withFilter, false);
    }

    public toggle(withFilter: Filter) {
        this.nextValue(withFilter, !this.isActiveWithFilter(withFilter));
    }

    private nextValue(withFilter: Filter, loading: boolean): void {
        this._loadingStates.set(withFilter, loading);
        from(this._loadingStates.values())
            .pipe(reduce((acc, val) => acc || val, false))
            .subscribe( result => this.next(result));
    }
}
