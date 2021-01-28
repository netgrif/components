import {Component, ViewEncapsulation} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {AbstractSearchComponent, DATE_FORMAT, DialogService, LoggerService, SearchService} from '@netgrif/application-engine';
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

    constructor(searchService: SearchService, logger: LoggerService, dialogService: DialogService, translate: TranslateService) {
        super(searchService, logger, dialogService, translate);
    }
}
