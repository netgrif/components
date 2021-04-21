import {Inject, OnDestroy} from '@angular/core';
import {NAE_FILTER_FIELD} from './models/filter-field-injection-token';
import {FilterField} from './models/filter-field';
import {SearchService} from '../../search/search-service/search.service';
import {filter, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';

export abstract class AbstractFilterFieldContentComponent implements OnDestroy {

    public filterLoaded = false;

    private readonly _searchServiceSub: Subscription;

    protected constructor(@Inject(NAE_FILTER_FIELD) protected _filterField: FilterField,
                          protected _fieldSearchService: SearchService) {
        this._fieldSearchService.loadFromMetadata(this._filterField.filterMetadata);
        this._searchServiceSub = this._fieldSearchService.loadingFromMetadata$.pipe(filter(loading => !loading), take(1)).subscribe(() => {
            this.filterLoaded = true;
        });
    }

    public get editable(): boolean {
        return !!this._filterField.behavior.editable;
    }

    ngOnDestroy(): void {
        if (this._searchServiceSub && !this._searchServiceSub.closed) {
            this._searchServiceSub.unsubscribe();
        }
    }

}
