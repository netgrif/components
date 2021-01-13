import {Component} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {
    AbstractSearchComponent,
    DATE_FORMAT,
    LoggerService,
    SearchService
} from '@netgrif/application-engine';

@Component({
    selector: 'nc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
})
export class SearchComponent extends AbstractSearchComponent {

    constructor(protected _searchService: SearchService,
                protected _logger: LoggerService) {
        super(_searchService, _logger);
    }
}
