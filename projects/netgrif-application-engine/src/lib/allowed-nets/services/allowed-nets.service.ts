import {Injectable, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {ProcessService} from '../../process/process.service';
import {Net} from '../../process/net';
import {map, switchMap, tap} from 'rxjs/operators';

/**
 * This service holds the information about the allowed nets for a specific view.
 */
@Injectable()
export class AllowedNetsService implements OnDestroy {

    protected _allowedNets$: ReplaySubject<Array<Net>>;
    protected _allowedNets: Array<Net>;
    protected _allowedNetsIdentifiers$: ReplaySubject<Array<string>>;
    protected _allowedNetsIdentifiers: Array<string>;
    private subAllowedNets: Subscription;

    /**
     * The service converts identifiers to {@link Net} objects on its own.
     *
     * When a new set of allowed nets is emitted into the input Observable the allowed nets for the view are updated.
     *
     * @param allowedNetIdentifiers$ identifiers of the allowed nets
     * @param _processService process service
     */
    constructor(allowedNetIdentifiers$: Observable<Array<string>>, protected _processService: ProcessService) {
        this._allowedNets$ = new ReplaySubject<Array<Net>>(1);
        this._allowedNetsIdentifiers$ = new ReplaySubject<Array<string>>(1);
        this.subAllowedNets = allowedNetIdentifiers$.pipe(
            tap(identifiers => {
                this._allowedNetsIdentifiers$.next(identifiers);
                this._allowedNetsIdentifiers = [...identifiers];
            }),
            map(identifiers => this._processService.getNets(identifiers)),
            switchMap(nets => nets)
        ).subscribe(nets => {
            this._allowedNets$.next(nets);
            this._allowedNets = [...nets];
        });
    }

    /**
     * Emits any time the allowed nets change. The first emission comes after the source observable emits for the first time.
     *
     * If a value has already been emitted, subscribing to the stream will provide the last emitted value.
     */
    public get allowedNets$(): Observable<Array<Net>> {
        return this._allowedNets$.asObservable();
    }

    /**
     * @returns the current value of the allowed nets. If allowed nets are yet to bee set, `undefined` is returned.
     */
    public get allowedNets(): (readonly Net[]) | undefined {
        return this._allowedNets;
    }

    /**
     * Emits any time the allowed nets change. The first emission comes after the source observable emits for the first time.
     *
     * If a value has already been emitted, subscribing to the stream will provide the last emitted value.
     */
    public get allowedNetsIdentifiers$(): Observable<Array<string>> {
        return this._allowedNetsIdentifiers$.asObservable();
    }

    /**
     * @returns the current value of the allowed nets identifiers. If allowed nets are yet to bee set, `undefined` is returned.
     */
    public get allowedNetsIdentifiers(): (readonly string[]) | undefined {
        return this._allowedNetsIdentifiers;
    }

    ngOnDestroy(): void {
        this._allowedNets$.complete();
        this._allowedNetsIdentifiers$.complete();
        this.subAllowedNets.unsubscribe();
    }
}
