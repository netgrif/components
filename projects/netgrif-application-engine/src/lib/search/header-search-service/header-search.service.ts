import {Injectable, Optional} from '@angular/core';
import {SearchService} from '../search-service/search.service';
import {AbstractHeaderService} from '../../header/abstract-header-service';
import {HeaderType} from '../../header/models/header-type';
import {filter} from 'rxjs/operators';
import {HeaderChangeType} from '../../header/models/user-changes/header-change-type';
import {HeaderMode} from '../../header/models/header-mode';
import {ModeChangeDescription} from '../../header/models/user-changes/mode-change-description';
import {SearchChangeDescription} from '../../header/models/user-changes/search-change-description';

/**
 * Acts as an intermediary between the {@link AbstractHeaderService} instances of various types and the {@link SearchService}
 */
@Injectable()
export class HeaderSearchService {

    protected _headerService: AbstractHeaderService;

    constructor(@Optional() protected _searchService: SearchService) {
    }

    public set headerService(headerService: AbstractHeaderService) {
        if (headerService.headerType === HeaderType.CASE || headerService.headerType === HeaderType.TASK) {
            this._headerService = headerService;
        }

        if (headerService && this._searchService) {
            this.initializeHeaderSearch();
        }
    }

    /**
     * {@link HeaderSearchService} can only be initialized if it successfully injected a {@link SearchService}
     * and a {@link AbstractHeaderService} instance of any of the supported types was set into it.
     *
     * Currently only task and case header searching is supported.
     */
    protected initializeHeaderSearch(): void {
        this._headerService.headerChange$
            .pipe(filter(change => change.changeType === HeaderChangeType.SEARCH || change.changeType === HeaderChangeType.MODE_CHANGED))
            .subscribe(change => {
                if (change.changeType === HeaderChangeType.SEARCH) {
                    this.processSearchChange(change.headerType, change.description as SearchChangeDescription);
                } else if ((change.description as ModeChangeDescription).previousMode === HeaderMode.SEARCH) {
                    this.processModeChange();
                }
            });
    }

    /**
     * Pushes all the predicates from the headers into the search interface
     */
    protected processModeChange(): void {

    }

    /**
     * Transforms the {@link HeaderChange} object into a search predicate
     */
    protected processSearchChange(headerType: HeaderType, changeDescription: SearchChangeDescription): void {
        if (headerType === HeaderType.CASE) {
            this.processCaseSearch(changeDescription);
        } else {
            this.processTaskSearch(changeDescription);
        }
    }

    protected processCaseSearch(changeDescription: SearchChangeDescription): void {

    }

    protected processTaskSearch(changeDescription: SearchChangeDescription): void {

    }
}
