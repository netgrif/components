import {Inject, OnDestroy} from '@angular/core';
import {FilterTextConfiguration, NAE_FILTER_TEXT} from './model/filter-text-injection-token';
import {SearchService} from '../../search/search-service/search.service';
import {Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {FilterTextSegment} from '../../search/models/persistance/filter-text-segment';
import {TranslateService} from '@ngx-translate/core';

export abstract class AbstractImmediateFilterTextContentComponent implements OnDestroy {

    private readonly _searchServiceSub: Subscription;

    public segments: Array<FilterTextSegment> = [];

    public tooltip: string;

    public get ellipsis(): boolean {
        return this._configuration.ellipsis;
    }

    protected constructor(@Inject(NAE_FILTER_TEXT) protected _configuration: FilterTextConfiguration,
                          protected _textSearchService: SearchService,
                          protected _translateService: TranslateService) {
        this._textSearchService.loadFromMetadata(this._configuration.metadata.filterMetadata);
        this._searchServiceSub = this._textSearchService.loadingFromMetadata$.pipe(filter(loading => !loading), take(1)).subscribe(() => {
            this.segments = this._textSearchService.createFilterTextSegments();
            this.tooltip = this.segments.map(segment => {
                const translation = this._translateService.instant(segment.segment);
                if (segment.uppercase) {
                    return translation.toUpperCase();
                }
                return translation;
            }).join(' ');
        });
    }

    ngOnDestroy(): void {
        if (this._searchServiceSub && !this._searchServiceSub.closed) {
            this._searchServiceSub.unsubscribe();
        }
    }

}
