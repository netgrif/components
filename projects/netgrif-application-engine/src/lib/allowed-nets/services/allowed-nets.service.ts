import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProcessService} from '../../process/process.service';
import {Net} from '../../process/net';
import {map, share, switchMap} from 'rxjs/operators';

/**
 * This service holds the information about the allowed nets for a specific view.
 */
@Injectable()
export class AllowedNetsService {

    private readonly _allowedNets$: Observable<Array<Net>>;

    /**
     * The service converts identifiers to {@link Net} objects on its own.
     *
     * When a new set of allowed nets is emitted into the input Observable the allowed nets for the view are updated.
     *
     * @param allowedNetIdentifiers$ identifiers of the allowed nets
     * @param _processService process service
     */
    constructor(allowedNetIdentifiers$: Observable<Array<string>>, protected _processService: ProcessService) {
        this._allowedNets$ = allowedNetIdentifiers$.pipe(
            map(identifiers => this._processService.getNets(identifiers)),
            switchMap(nets => nets),
            share()
        );
    }

    public get allowedNets$(): Observable<Array<Net>> {
        return this._allowedNets$;
    }
}
