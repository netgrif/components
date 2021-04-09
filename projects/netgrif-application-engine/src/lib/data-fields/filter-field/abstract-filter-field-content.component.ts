import {Inject} from '@angular/core';
import {NAE_FILTER_FIELD} from './models/filter-field-injection-token';
import {FilterField} from './models/filter-field';
import {SearchService} from '../../search/search-service/search.service';
import {filter, take} from 'rxjs/operators';

export abstract class AbstractFilterFieldContentComponent {

    public filterLoaded = false;

    protected constructor(@Inject(NAE_FILTER_FIELD) protected _filterField: FilterField,
                          protected _fieldSearchService: SearchService) {
        this._fieldSearchService.loadFromMetadata(this._filterField.filterMetadata);
        this._fieldSearchService.loadingFromMetadata$.pipe(filter(loading => !loading), take(1)).subscribe(() => {
            this.filterLoaded = true;
        });
    }

    public get editable(): boolean {
        return !!this._filterField.behavior.editable;
    }

}
