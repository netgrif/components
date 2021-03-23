import {Injectable, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {ProcessService} from '../../process/process.service';
import {Net} from '../../process/net';
import {map, switchMap} from 'rxjs/operators';

/**
 * This service holds the information about the allowed nets for a specific view.
 */
@Injectable()
export class AllowedNetsService implements OnDestroy {

    protected _allowedNets$: ReplaySubject<Array<Net>>;
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
        this.subAllowedNets = allowedNetIdentifiers$.pipe(
            map(identifiers => this._processService.getNets(identifiers)),
            switchMap(nets => nets)
        ).subscribe(nets => {
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
