import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ChipRequest} from '../models/chips/chip-request';
import {Predicate} from '../models/predicate/predicate';

@Injectable()
export class SearchChipService {

    private _addChipRequests$: Subject<ChipRequest>;

    constructor() {
        this._addChipRequests$ = new Subject<ChipRequest>();
    }

    /**
     * Search GUI should subscribe to this to receive information about the chips it should add
     */
    public get addChipRequests$(): Observable<ChipRequest> {
        return this._addChipRequests$.asObservable();
    }

    /**
     * Add a new chip into the search GUI, if no GUI exists does nothing
     * @param chipText the text that should be displayed on the chip
     * @param chipPredicate the search predicate that should be contained within the chip
     */
    public addChip(chipText: string, chipPredicate: Predicate): void {
        this._addChipRequests$.next({chipText, chipPredicate});
    }
}
