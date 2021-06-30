import {BehaviorSubject, from} from 'rxjs';
import {reduce} from 'rxjs/operators';

/**
 * A utility class similar to {@link LoadingEmitter} that allows for parallel tracking of multiple loadings.
 *
 * If at least one key is loading, the value is `true`, otherwise the value is `false`.
 * Whenever one of the tracked states changes, a new value is emitted.
 *
 * Beware that the type parameter T is used as a {@link Map} key,
 * and therefore caution must be exercised when using non-primitive types, because of object equality.
 */
export class LoadingWithKeyEmitter<T> extends BehaviorSubject<boolean> {

    private _loadingStates: Map<T, boolean>;

    constructor(initial = false) {
        super(initial);
        this._loadingStates = new Map<T, boolean>();
    }

    public get isActive(): boolean {
        return this.getValue();
    }

    public isActiveWithFilter(withKey: T): boolean {
        return !!this._loadingStates.get(withKey);
    }

    public on(withKey: T) {
        this.nextValue(withKey, true);
    }

    public off(withKey: T) {
        this.nextValue(withKey, false);
    }

    public toggle(withKey: T) {
        this.nextValue(withKey, !this.isActiveWithFilter(withKey));
    }

    private nextValue(withKey: T, loading: boolean): void {
        this._loadingStates.set(withKey, loading);
        from(this._loadingStates.values())
            .pipe(reduce((acc, val) => acc || val, false))
            .subscribe( result => this.next(result));
    }
}
