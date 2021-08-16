import {Component, Inject, Optional, ViewEncapsulation} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {
    AbstractSearchComponent,
    DATE_FORMAT,
    DialogService,
    LoggerService,
    SearchService,
    NAE_SEARCH_COMPONENT_CONFIGURATION,
    SearchComponentConfiguration,
    UserFiltersService,
    AllowedNetsService,
    NAE_SEARCH_CATEGORIES,
    Category,
    ViewIdService,
    NAE_FILTERS_FILTER,
    Filter
} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
})
export class SearchComponent extends AbstractSearchComponent {

    constructor(searchService: SearchService,
                logger: LoggerService,
                dialogService: DialogService,
                translate: TranslateService,
                userFilterService: UserFiltersService,
                allowedNetsService: AllowedNetsService,
                viewIdService: ViewIdService,
                @Inject(NAE_SEARCH_CATEGORIES) searchCategories: Array<Category<any>>,
                @Optional() @Inject(NAE_SEARCH_COMPONENT_CONFIGURATION) configuration: SearchComponentConfiguration,
                @Optional() @Inject(NAE_FILTERS_FILTER) filtersFilter: Filter = null) {
        super(searchService, logger, dialogService, translate, userFilterService, allowedNetsService,
            viewIdService, searchCategories, configuration, filtersFilter);
    }
}
