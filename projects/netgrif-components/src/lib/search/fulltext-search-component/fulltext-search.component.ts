import {Component} from '@angular/core';
import {AbstractFulltextSearchComponent, SearchService} from '@netgrif/components-core';

@Component({
    selector: 'nc-fulltext-search',
    templateUrl: './fulltext-search.component.html',
    styleUrls: ['./fulltext-search.component.scss']
})
export class FulltextSearchComponent extends AbstractFulltextSearchComponent {

    constructor(searchService: SearchService) {
        super(searchService);
    }

}
