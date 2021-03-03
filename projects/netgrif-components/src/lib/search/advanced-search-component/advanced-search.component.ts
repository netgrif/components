import {Component} from '@angular/core';
import {AbstractAdvancedSearchComponent, SearchService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-advanced-search',
    templateUrl: './advanced-search.component.html',
    styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent extends AbstractAdvancedSearchComponent {

    constructor(searchService: SearchService) {
        super(searchService);
    }

}
