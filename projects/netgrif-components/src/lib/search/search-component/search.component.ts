import {Component, Optional} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {DATE_FORMAT, AbstractSearchComponent, SearchService, LoggerService, SearchChipService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
})
export class SearchComponent extends AbstractSearchComponent {

    constructor(protected _translate: TranslateService,
                protected _searchService: SearchService,
                protected _logger: LoggerService,
                @Optional() protected _searchChipService: SearchChipService) {
        super(_translate, _searchService, _logger, _searchChipService);
    }
}
