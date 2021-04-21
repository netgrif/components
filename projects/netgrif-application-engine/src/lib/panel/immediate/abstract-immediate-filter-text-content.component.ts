import {Inject, OnDestroy} from '@angular/core';
import {NAE_FILTER_TEXT} from './model/filter-text-injection-token';
import {FilterMetadataAllowedNets} from '../../search/models/persistance/filter-metadata-allowed-nets';
import {SearchService} from '../../search/search-service/search.service';
import {Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {FilterTextSegment} from '../../search/models/persistance/filter-text-segment';

export abstract class AbstractImmediateFilterTextContentComponent implements OnDestroy {

    private readonly _searchServiceSub: Subscription;

    public segments: Array<FilterTextSegment> = [];

    protected constructor(@Inject(NAE_FILTER_TEXT) protected _filterMetadata: FilterMetadataAllowedNets,
                          protected _textSearchService: SearchService) {
        this._textSearchService.loadFromMetadata(this._filterMetadata.filterMetadata);
        this._searchServiceSub = this._textSearchService.loadingFromMetadata$.pipe(filter(loading => !loading), take(1)).subscribe(() => {
            this.segments = this._textSearchService.createFilterTextSegments();
        });
    }

    ngOnDestroy(): void {
        if (this._searchServiceSub && !this._searchServiceSub.closed) {
            this._searchServiceSub.unsubscribe();
        }
    }

}
