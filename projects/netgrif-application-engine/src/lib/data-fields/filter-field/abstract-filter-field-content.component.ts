import {Inject} from '@angular/core';
import {NAE_FILTER_FIELD} from './models/filter-field-injection-token';
import {FilterField} from './models/filter-field';
import {SearchService} from '../../search/search-service/search.service';

export abstract class AbstractFilterFieldContentComponent {

    protected constructor(@Inject(NAE_FILTER_FIELD) protected _filterField: FilterField,
                          protected _fieldSearchService: SearchService) {
        this._fieldSearchService.loadFromMetadata(this._filterField.filterMetadata);
    }

}
