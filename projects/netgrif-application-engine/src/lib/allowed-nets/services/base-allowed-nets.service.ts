import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BaseAllowedNetsService implements OnDestroy {

    protected _baseAllowedNets: BehaviorSubject<Array<string>>;
    private _sub: Subscription;

    constructor() {
        this._baseAllowedNets = new BehaviorSubject([]);
    }

    ngOnDestroy(): void {
        this._baseAllowedNets.complete();

        if (this._sub !== undefined) {
            this._sub.unsubscribe();
        }
    }

    /**
     * Sets the new identifiers of the base allowed nets
     * @param nets new base net identifiers
     */
    public set allowedNets(nets: Array<string>) {
        this._baseAllowedNets.next(nets);
    }

    /**
     * @returns the currently set allowed nets. Returns an empty array if no value was set.
     */
    public get allowedNets(): Array<string> {
        return this._baseAllowedNets.value;
    }

    /**
     * Subscribes to the provided `Observable` and forwards the emissions to the baseAllowedNets `Subject`.
     * If a new `Observable` is set, the previous Subscription is unsubscribed.
     * @param observableNets an observable emitting the new base net identifiers
     */
    public set allowedNets$(observableNets: Observable<Array<string>>) {
        if (this._sub !== undefined) {
            this._sub.unsubscribe();
        }

        this._sub = observableNets.subscribe(nets => {
            this._baseAllowedNets.next(nets);
        });
    }

    /**
     * @returns an observable that emits the currently set base allowed nets and any subsequent values
     */
    public get allowedNets$(): Observable<Array<string>> {
        return this._baseAllowedNets.asObservable();
    }
}
